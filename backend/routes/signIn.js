const express = require('express')
const router = express.Router()

const db = require('../db/dbConnect')
const bcrypt = require('bcrypt')

router.post('/', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    
    let q = 'SELECT * FROM giveback.users WHERE email = ?'

    db.connPool.query(q, [email], (err, rows) => {
        if (err)
            res.status(400).send('something went wrong')
        else {
            if (rows.length > 0) {
                bcrypt.compare(password, rows[0].pass, (err, match) => {
                    if (err)
                        console.error(err)
                    else{
                        if (match) {
                            res.type('json')
                            res.status(200).json({
                                userEmail: rows[0].email,
                                userType: rows[0].userType
                            })
                        } else
                            res.status(204).send('Email and password don\'t match')  
                    } 
                })
            } else 
                res.status(204).send('Wrong email')
        }
    })
})

module.exports = router