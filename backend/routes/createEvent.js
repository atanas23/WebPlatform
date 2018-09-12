const express = require('express')
const path = require('path')
const router = express.Router()

const db = require('../db/dbConnect')

router.post('/', (req, res, next) => {
    const orgName = req.body.orgName

    let orgIdQ = 'SELECT orgID '
        + 'FROM giveback.organisations '
        + 'WHERE orgName = ?'
    
    let addEventQ = 'INSERT INTO giveback.events (orgID, eventName, eventDesc, eventLat, eventLong, eventTag, eventLoc) '
        + 'VALUES (?, ?, ?, ?, ?, ?, ?)'

    db.connPool.query(orgIdQ, orgName, (err, orgID) => {
        if (err) 
            res.status(400).send('no such org')
        else {
            let data = [
                orgID[0]['orgID'],
                req.body.eventName,
                req.body.eventDesc,
                req.body.eventLat,
                req.body.eventLong,
                req.body.eventTag,
                req.body.eventLoc
            ]

            console.log(data)
            db.connPool.query(addEventQ, data, (err, insert) => {
                if(err)
                    res.status(400).send('something went wrong')
                else 
                    res.status(201).send()
            })
        }
    })
})

module.exports = router