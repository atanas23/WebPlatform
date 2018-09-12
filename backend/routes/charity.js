var express = require('express')
var router = express.Router()

const db = require('../db/dbConnect')

router.post('/', (req, res, next) => {
    let id = req.body.id

    let q = 'SELECT o.orgName, o.orgBio, o.orgEmail, o.orgFB, e.eventName, e.eventDesc '
        + 'FROM giveback.organisations AS o '
        + 'LEFT JOIN giveback.events AS e ON e.orgID = o.orgID '
        + 'WHERE o.orgID = ? '
    
    db.connPool.query(q, id, (err, rows) => {
        if (err) {
            console.error(err)
            res.status(400).send('something went wrong')
        } else if (rows.length === 0) 
            res.status(404).send()
        else
            res.status(200).json(rows)
    })
})

module.exports = router