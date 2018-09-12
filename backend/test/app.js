process.env.NODE_ENV = 'test'

const chai = require('chai')
const request = require('request')
const expect = chai.expect
const sinon = require('sinon')  

const server = require('../app')
const charity = require('../routes/charity')
const charities = require('../routes/charities')
const register = require('../routes/signUp')
const login = require('../routes/signIn')
const myDon = require('../routes/myDonations')
const trending = require('../routes/trending')
const leastTrending = require('../routes/leastTrending')
const registerDonation = require('../routes/registerDonation')
const modAccount = require('../routes/modAccount')
const modCharities = require('../routes/modCharities')
const statistics = require('../routes/statistics')
const getCoords = require('../routes/getCoords')
const createEvent = require('../routes/createEvent')

describe('Testing main file', () => {
    it('it should return all charity events of a charity', (done) => {
        let orgIdSuccess = {id: 6}

        request
        .post({url: 'http://localhost:8080/charities/' + orgIdSuccess.id, form: orgIdSuccess}, (err, res) => {
            expect(res.statusCode).to.equal(200)
            done()
        })
    })

    it('it should return 404, no such charity', (done) => {
        let orgIdError = {id: 600}
        
        request
        .post({url: 'http://localhost:8080/charities/' + orgIdError.id, form: orgIdError}, (err, res, body) => {
            expect(res.statusCode).to.equal(404)
            done()
        })
    })

    it('error 404, no such path', (done) => {
        let orgIdError = {id: 600}
        
        request
        .get('http://localhost:8080/charitiess/', (err, res, body) => {
            expect(res.statusCode).to.equal(404)
            done()
        })
    })
})

describe('Testing routes', () => {
    it('/charities/:id', (done) => {
        let orgIdSuccess = {id: 6}

        let callback = sinon.spy(charity, 'post')

        expect(callback.called)
        done()
    })


    it('/charities', (done) => {
        let callback = sinon.spy(charities, 'post')

        expect(callback.called)
        done()
    })

    it('/signup', (done) => {
        let accInfo = {
            email: 'test@t.t',
            password: 123456789,
            postCode: 'B15 2QA'
        }

        let callback = sinon.spy(register, 'post')

        request
        .post({url: 'http://localhost:8080/signup' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(400)
            expect(callback.called)
            done()
        })
    })

    it('/signin', (done) => {
        let orgIdSuccess = {id: 6}

        let accInfo = {
            email: 'test@t.t'
        }

        let callback = sinon.spy(login, 'post')

        request
        .post({url: 'http://localhost:8080/login' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(404)
            expect(callback.called)
            done()
        })
    })

    it('/my-donations', (done) => {
        let orgIdSuccess = {id: 6}
        let accInfo = {
            email: 'test@t.t'
        }

        let callback = sinon.spy(myDon, 'post')

        request
        .post({url: 'http://localhost:8080/my-donations' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(204)
            expect(callback.called)
            done()
        })
    })

    it('/trending', (done) => {
        let orgIdSuccess = {id: 6}
        let accInfo = {
            email: 'atanas.harbaliev@gmail.com'
        }

        let callback = sinon.spy(trending, 'post')

        request
        .post({url: 'http://localhost:8080/trending' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/least-trending', (done) => {
        let orgIdSuccess = {id: 6}
        let accInfo = {
            email: 'atanas.harbaliev@gmail.com'
        }

        let callback = sinon.spy(leastTrending, 'post')

        request
        .post({url: 'http://localhost:8080/least-trending' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/donate', (done) => {
        let orgIdSuccess = {id: 6}
        let donInfo = {
            email: 'atanas.harbaliev@gmail.com',
            charity: 'Vitality London10,000',
            donation: 15
        }

        let callback = sinon.spy(registerDonation, 'post')

        request
        .post({url: 'http://localhost:8080/donate' , form: donInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/mod-account', (done) => {
        let orgIdSuccess = {id: 6}
        let accInfo = {
            email: 'atanas.harbaliev@gmail.com'
        }

        let callback = sinon.spy(modAccount, 'post')

        request
        .post({url: 'http://localhost:8080/mod-account' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/mod-charities', (done) => {
        let orgIdSuccess = {id: 6}
        let accInfo = {
            email: 'atanas.harbaliev@gmail.com'
        }

        let callback = sinon.spy(modCharities, 'post')

        request
        .post({url: 'http://localhost:8080/mod-charities' , form: accInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/statistics', (done) => {
        let orgIdSuccess = {id: 6}
        let statInfo = {
            email: 'atanas.harbaliev@gmail.com',
            key: 'donC'
        }

        let callback = sinon.spy(statistics, 'post')

        request
        .post({url: 'http://localhost:8080/statistics' , form: statInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/getCoords', (done) => {
        let orgIdSuccess = {id: 6}

        let callback = sinon.spy(getCoords, 'post')

        request
        .post('http://localhost:8080/getCoords', (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            expect(callback.called)
            done()
        })
    })

    it('/create-event', (done) => {
        let orgIdSuccess = {id: 6}
        let statInfo = {
            orgID: 6,
            eventName: 'Test',
            eventDesc: 'test',
            eventLong: '12.123456',
            eventTag: 'elderly',
            eventLoc: 'London'
        }

        let callback = sinon.spy(createEvent, 'post')

        request
        .post({url: 'http://localhost:8080/create-event' , form: statInfo}, (err, res, body) => {
            expect(res.statusCode).to.equal(400)
            expect(callback.called)
            done()
        })
    })
})