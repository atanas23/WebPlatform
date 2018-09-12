const express = require('express')
const router = express.Router()

const db = require('../db/dbConnect')

router.post('/', (req, res, next) => {
    const email = req.body.email

    let q = 'SELECT u.user, e.eventName, e.eventDesc, ' 
        + 'e.eventTag, o.orgName, u.amount '
        + 'FROM giveback.user_activity AS u '
        + 'INNER JOIN giveback.events AS e ON u.eventID = e.eventID '
        + 'INNER JOIN giveback.organisations AS o ON e.orgID = o.orgID '
        + 'WHERE u.user = ? '

    db.connPool.query(q, [email], (err, rows) => {
        if (err) {
            console.error(err)
            res.status(400).send('something went wrong')
        }
        else if (rows.length > 0) 
            res.status(200).json(rows)
        else 
            res.status(204).send('no donations were made')
    })
})

module.exports = router