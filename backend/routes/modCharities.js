var express = require('express')
var router = express.Router()

const db = require('../db/dbConnect')

router.post('/', function(req, res, next) {
    const email = req.body.email

    let getOrgQ = 'SELECT userOrg FROM giveback.users WHERE email = ?'
    let getCharities = 'SELECT o.orgName, e.eventName, e.eventDesc, e.eventLat, e.eventLong, e.eventTag, e.eventLoc '
        + 'FROM giveback.events AS e, giveback.organisations AS o '
        + 'WHERE o.orgName = ? AND o.orgID = e.orgID'
        
    db.connPool.query(getOrgQ, [email], (err, org) => {
        if (err) {
            console.error(err)
            res.status(400).send('something went wrong')
        } else {
            db.connPool.query(getCharities, [org[0]['userOrg']], (err, rows) => {
                if (err) {
                    console.error(err)
                    res.status(400).send('something went wrong')
                } else {
                     res.status(200).json(rows)
                }
            })
        }
    })
})

module.exports = router