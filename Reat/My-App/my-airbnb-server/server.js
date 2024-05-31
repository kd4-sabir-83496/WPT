const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

const app = express()
app.use(cors())
app.use(express.json())

// middleware to verify the token
app.use((request, response, next) => {
  // check if token is required for the API
  if (
    request.url === '/user/login' ||
    request.url === '/user/register' ||
    request.url === '/admin/login' ||
    request.url === '/admin/register' ||
    request.url.startsWith('/image/')
  ) {
    // skip verifying the token
    next()
  } else {
    // get the token
    const token = request.headers['token']

    if (!token || token.length === 0) {
      response.send(utils.createErrorResult('missing token'))
    } else {
      try {
        // verify the token
        const payload = jwt.verify(token, config.secret)

        // add the user Id to the request
        request.userId = payload['id']

        //TODO: expiry logic

        // call the real route
        next()
      } catch (ex) {
        response.send(utils.createErrorResult('invalid token'))
      }
    }
  }
})

// add the routes
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const categoryRouter = require('./routes/category')
const imageRouter = require('./routes/image')
const propertyRouter = require('./routes/property')
const bookingRouter = require('./routes/booking')

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/category', categoryRouter)
app.use('/image', imageRouter)
app.use('/property', propertyRouter)
app.use('/booking', bookingRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
