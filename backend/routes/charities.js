const express = require('express')
const router = express.Router()

const db = require('../db/dbConnect')

router.post('/', (req, res, next) => {
    let q = 'SELECT o.orgID, o.orgName, o.orgBio, o.orgPrimeTag, e.eventTag '
        + 'FROM giveback.organisations AS o '
        + 'LEFT JOIN giveback.events AS e ON e.orgID = o.orgID '

    db.connPool.query(q, (err, rows) => {
        if (err) {
            console.error(err)
            res.status(400).send('something went wrong')
        } else
            res.status(200).json(rows)
    })
})

module.exports = router


