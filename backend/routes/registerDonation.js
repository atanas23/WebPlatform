var express = require('express')
var router = express.Router()

const db = require('../db/dbConnect')

//get home page
router.post('/', (req, res, next) => {
    const email = req.body.email
    const charity = req.body.charity
    const donation = req.body.donation
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    const d = new Date()
    let year = d.getFullYear()
    let month = ('0' + (d.getMonth() + 1)).slice(-2)
    let day = ('0' + d.getDate()).slice(-2)
    let dateOfDonation = year + '/' + month + '/' + day

    let findEventIdQ = 'SELECT eventID FROM giveback.events '
        + 'WHERE eventName = ?'

    let regDonQ = 'INSERT INTO giveback.user_activity (user, eventID, amount, date, day) '
        + 'VALUES (?, ?, ?, ?, ?) '
    
    db.connPool.query(findEventIdQ, [charity], (err, id) => {
        if (err) {
            console.error(err)
            res.status(404).send('can\'t find id')
        } else {
            let ID = id[0]['eventID']
            db.connPool.query(regDonQ, [email, ID, donation, dateOfDonation, weekDays[d.getDay()]], (err, rows) => {
                if (err) {
                    console.error(err)
                    res.status(400).send('someting went wrong')
                } else 
                    res.status(200).send('donation successful')
            })
        }
    })    
})

module.exports = router