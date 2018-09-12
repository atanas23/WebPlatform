var express = require('express')
var router = express.Router()

const db = require('../db/dbConnect')

router.post('/', function(req, res, next) {

    let coordsQ = 'SELECT eventID, eventName, eventDesc, eventLat, eventLong '
        + 'FROM giveback.events'
        
    db.connPool.query(coordsQ, (err, rows) => {
        if (err) {
            console.error(err)
            res.status(400).send('something went wrong')
        } else 
            res.status(200).json(rows)
    })
})

module.exports = router