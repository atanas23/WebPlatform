const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


/* routing */
const charity = require('./routes/charity')
const charities = require('./routes/charities')
const register = require('./routes/signUp')
const login = require('./routes/signIn')
const myDon = require('./routes/myDonations')
const trending = require('./routes/trending')
const leastTrending = require('./routes/leastTrending')
const registerDonation = require('./routes/registerDonation')
const modAccount = require('./routes/modAccount')
const modCharities = require('./routes/modCharities')
const statistics = require('./routes/statistics')
const getCoords = require('./routes/getCoords')
const createEvent = require('./routes/createEvent')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/* routing */
app.use('/charities/:id', charity)
app.use('/charities', charities)
app.use('/signup', register)
app.use('/signin', login)
app.use('/my-donations', myDon)
app.use('/trending', trending)
app.use('/least-trending', leastTrending)
app.use('/donate', registerDonation)
app.use('/mod-account', modAccount)
app.use('/mod-charities', modCharities)
app.use('/statistics', statistics)
app.use('/getCoords', getCoords)
app.use('/create-event', createEvent)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


if(!module.parent) {
  app.listen(8080)
}

module.exports = app