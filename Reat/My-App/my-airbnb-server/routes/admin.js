const express = require('express')
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')

const router = express.Router()

router.post('/register', (request, response) => {
  const { firstName, lastName, email, password } = request.body
  const statement = `insert into admin (firstName, lastName, email, password) values (?, ?, ?, ?);`
  const encryptedPassword = String(crypto.SHA256(password))
  db.pool.execute(
    statement,
    [firstName, lastName, email, encryptedPassword],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.post('/login', (request, response) => {
  const { email, password } = request.body
  const statement = `select id, firstName, lastName, isDeleted from admin where email = ? and password = ?`
  const encryptedPassword = String(crypto.SHA256(password))
  db.pool.query(statement, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error))
    } else {
      if (users.length == 0) {
        response.send(utils.createErrorResult('admin does not exist'))
      } else {
        const user = users[0]
        if (user.isDeleted) {
          response.send(utils.createErrorResult('your account is closed'))
        } else {
          // create the payload
          const payload = { id: user.id }
          const token = jwt.sign(payload, config.secret)
          const userData = {
            token,
            name: `${user['firstName']} ${user['lastName']}`,
          }
          response.send(utils.createSuccessResult(userData))
        }
      }
    }
  })
})

module.exports = router
