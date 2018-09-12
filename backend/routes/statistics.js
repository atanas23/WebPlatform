var express = require('express')
var router = express.Router()

const db = require('../db/dbConnect')

const executeQuery = (sql, args) => {
    return new Promise( (resolve, reject) => {
        db.connPool.query(sql, args, (err, rows) => {
            if (err)
                return reject(err)
            resolve(rows)
        } )
    } )
}

router.post('/', function(req, res, next) {
    const email = req.body.email
    const key = req.body.key
    let countIDs = ''

    let getOrgQ = 'SELECT userOrg FROM giveback.users WHERE email = ?'

    let getDayStatsQ = 'SELECT ua.day, COUNT(ua.day) AS donationsCount '
        + 'FROM giveback.user_activity AS ua, giveback.organisations AS o, giveback.events AS e '
        + 'WHERE o.orgName = ? AND ua.eventID = e.eventID AND e.orgID = o.orgID '
        + 'GROUP BY day '
        + 'ORDER BY FIELD(ua.day, \'Monday\', \'Tuesday\', \'Wednesday\', \'Thursday\', \'Friday\', \'Saturday\', \'Sunday\')'

    let getOrgEventsIDs = 'SELECT e.eventID ' 
        + 'FROM giveback.events AS e, giveback.organisations AS o '
        + 'WHERE o.orgName = ? AND o.orgID = e.orgID'
    
    if (key === 'donC') {
        executeQuery(getOrgQ, [email])
        .then((org) => {
            return executeQuery(getDayStatsQ, [org[0]['userOrg']])
        })
        .then((rows) => {
            res.status(200).json(rows)
        })
        .catch((err) => {
            console.error(err)
            res.status(400).send('something went wrong')
        })
    }

    if (key === 'postC') {
        executeQuery(getOrgQ, [email])
        .then((org) => {
            return executeQuery(getOrgEventsIDs, [org[0]['userOrg']])
        })
        .then((ids) => {
            let IDs = []
            ids.forEach(element => {
                IDs.push(element['eventID'])
            })
            
            for (i = 0; i < IDs.length; i++) {
                countIDs += '?,' 
            }
            countIDs = countIDs.substring(0, countIDs.length - 1)

            let getPostCodeStatsQ = 'SELECT u.userPostC, COUNT(u.userPostC) as donationsCount ' 
                + 'FROM giveback.user_activity AS ua, giveback.users as u '
                + 'WHERE ua.eventID IN (' + countIDs + ') AND u.email = ua.user '
                + 'GROUP BY u.userPostC'

            executeQuery(getPostCodeStatsQ, IDs)
            .then((rows) =>{
                console.log(rows)
                res.status(200).json(rows)
            })
            .catch((err) => {
                console.error(err)
                res.status(400).send('something went wrong')
            })
        })
    }
})

module.exports = router
