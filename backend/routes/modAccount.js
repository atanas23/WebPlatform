var express = require('express')
var router = express.Router()

const db = require('../db/dbConnect')

router.post('/', function(req, res, next) {
    const email = req.body.email

    let infoQ = 'SELECT u.email, u.firstName, u.lastName, o.orgName, o.orgBio, o.orgPrimeTag, o.orgEmail, o.orgFB ' 
        + 'FROM giveback.users AS u, giveback.organisations AS o '
        + 'WHERE u.email = ? ' 
        + 'AND u.userOrg = o.orgName'
        
    db.connPool.query(infoQ, [email], (err, rows) => {
        if (err) {
            console.error(err)
            res.status(400).send('something went wrong')
        } else 
            res.status(200).json(rows)
    })
})

module.exports = router