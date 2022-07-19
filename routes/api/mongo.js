const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { restart } = require('nodemon')
// 스키마 = 데이터의 타입명세(비슷한 뜻)
const Schema = mongoose.Schema
const Users = mongoose.model('users', new Schema({
  name: String,
  age: Number 
}))

// CREATE
router.post('/', async (req, res) => {
  const user = await Users.create({
    name: 'ByeonSeungHun',
    age: 27
  })
  console.log(user)

  res.status(200).json(true)
})

// READ
router.get('/', async (req, res) => {
  const users = await Users.find({})
  res.status(200).json(users)
})

// READ-NAME
router.get('/:name', async (req, res) => {
  const { name } =  req.params
  const user = await Users.findOne({ name })
  res.status(200).json(user)
})


// UPDATE
router.put('/:name', async (req, res) => {
  const { name } =  req.params
  const user = await Users.findOne({ name })
  const updatedUser = await user.updateOne({ age: 124 })
  res.status(200).json(updatedUser)
})

// READ-ONE BY ONE, UPDATE CONFIRM
router.get('/:name', async (req, res) => {
  const { name } =  req.params
  const user = await Users.findOne({ name })
  res.status(200).json(user)
})

// DELETE
router.delete('/:name', async (req, res) => {
  const { name } =  req.params
  const user = await Users.findOne({ name })
  await user.delete()
  res.status(200).json(true)
})

// DELETE-ONE BY ONE
router.post('/delete', async (req, res) => {
  const { name } =  req.body
  const user = await Users.findOne({ name })
  await user.delete()
  res.status(200).json(true)
})

module.exports = router