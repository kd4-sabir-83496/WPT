const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

// load the multer module
const multer = require('multer')

// create upload middleware
const upload = multer({ dest: 'images' })

router.post('/', upload.single('image'), (request, response) => {
  const {
    categoryId,
    title,
    details,
    address,
    contactNo,
    ownerName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent,
  } = request.body

  console.log(request.body)

  const query = `insert into property (categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent, profileImage) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
  db.pool.execute(
    query,
    [
      1,
      title,
      details,
      address,
      contactNo,
      ownerName,
      isLakeView,
      isTV,
      isAC,
      isWifi,
      isMiniBar,
      isBreakfast,
      isParking,
      guests,
      bedrooms,
      beds,
      bathrooms,
      rent,
      request.file.filename,
    ],
    (error, result) => {
      console.log(error)
      response.send(utils.createResult(error, result))
    }
  )
})

router.get('/', (request, response) => {
  const statement = `select id, title, address, contactNo, ownerName, rent, profileImage from property;`
  db.pool.query(statement, (error, properties) => {
    response.send(utils.createResult(error, properties))
  })
})

router.get('/details/:id', (request, response) => {
  const { id } = request.params
  const statement = `select * from property where id = ?;`
  db.pool.query(statement, [id], (error, properties) => {
    response.send(utils.createResult(error, properties[0]))
  })
})

module.exports = router
