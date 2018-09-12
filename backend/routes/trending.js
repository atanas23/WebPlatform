const express = require('express')
const router = express.Router()

const db = require('../db/dbConnect')

const RecommendationSys = require('../recommendationSys/recommendationSystem')
let graph = new RecommendationSys()

const executeQuery = (sql, args) => {
    return new Promise( (resolve, reject) => {
        db.connPool.query(sql, args, (err, rows) => {
            if (err)
                return reject(err)
            resolve(rows)
        } )
    } )
}

router.post('/', (req, res, next) => {
    const user = req.body.user
    let users = []
    let events = []
    let donatedTo = []
    let notDonated = []
    let recommendations = []
    let questionMarks = ''
    
    let userQ = 'SELECT DISTINCT u.uIndex, ua.user '
        + 'FROM giveback.users AS u, giveback.user_activity AS ua '
        + 'WHERE u.email = ua.user'
    
    let eventsQ = 'SELECT DISTINCT u.eventID, e.eventName '
        + 'FROM giveback.user_activity AS u, giveback.events AS e '
        + 'WHERE e.eventID = u.eventID'

    let donatedToQ = 'SELECT u.uIndex, ua.user, ua.eventID '
        + 'FROM giveback.users AS u, giveback.user_activity AS ua '
        + 'WHERE u.email = ? AND ua.user = ?'
    
    let notDonatedQ = 'SELECT u.uIndex, ua.user, ua.eventID '
        + 'FROM giveback.user_activity AS ua, giveback.users AS u '
        + 'WHERE ua.user = u.email AND ua.user != ?'
    
    executeQuery(userQ)
    .then((u) => {
        users = u
        return executeQuery(eventsQ)
    })
    .then((e) => {
        events = e
        return executeQuery(donatedToQ, [user, user])
    })
    .then((d) => {
        donatedTo = d
        return executeQuery(notDonatedQ, [user])
    })
    .then((n) => {
        notDonated = n
    })
    .then(() => {
        if (donatedTo && donatedTo.length > 0) {
            graph.generateGraph(users, events, donatedTo, notDonated, donatedTo[0].uIndex, (result) => {
                let recommendationNames = []
                result.forEach(element => {
                    recommendationNames.push(element['properties']['eventName'])  
                })
    
                for(j = 0; j < recommendationNames.length; j++) {
                    questionMarks += '?,'
                }
                questionMarks = questionMarks.substring(0, questionMarks.length - 1)
            
                let trendingQ = 'SELECT e.eventName, e.eventDesc, COUNT(ua.eventID) AS cnt '
                    + 'FROM giveback.events AS e, giveback.user_activity AS ua '
                    + 'WHERE  e.eventID = ua.eventID AND e.eventName IN (' + questionMarks + ') '
                    + 'GROUP BY e.eventName '
                    + 'ORDER BY cnt DESC'
    
                executeQuery(trendingQ, recommendationNames)
                .then((tr) => {
                    res.status(200).json(tr.slice(0, 10))
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).send()
                })
            })
        } else {
            let trendingQ = 'SELECT e.eventName, e.eventDesc, COUNT(ua.eventID) AS cnt '
                + 'FROM giveback.events AS e, giveback.user_activity AS ua '
                + 'WHERE  e.eventID = ua.eventID '
                + 'GROUP BY e.eventName '
                + 'ORDER BY cnt DESC'

            executeQuery(trendingQ)
            .then((tr) => {
                res.status(200).json(tr.slice(0, 10))
            })
            .catch((err) => {
                console.log(err)
                res.status(400).send()
            })
        }
        
        
    })
    .catch((err) => {
        console.log(err)
    })
    
})

module.exports = router