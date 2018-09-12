const express = require('express')
const path = require('path')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const db = require('../db/dbConnect')

router.post('/', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let userPostC = null

    if(req.body.postCode)
        userPostC = req.body.postCode
    
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err)
            console.error(err)
        else {
            let user = [email, hash, req.body.fName, req.body.sName, 'user', userPostC]
       
            let q = 'INSERT INTO giveback.users (email, pass, firstName, lastName, userType, userPostC) '
                + 'VALUES (?, ?, ?, ?, ?, ?)'
            db.connPool.query(q, user, (err, insert) => {
                if (err) {
                    res.status(400).send('email already exists')
                    return
                } else {
                    res.status(201).send('Success')
                }
            })
        }
    })
})

module.exports = router