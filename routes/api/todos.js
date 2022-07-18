// npm i nanoid@3
const fs = require('fs')
const { nanoid } = require('nanoid')
const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()

const todosDir = `${global.appRoot}/todos`
const todosFile = `${global.appRoot}/todos/index.json`

// test
// router.get('/', (req, res) => {
//   console.log('req.query: ',req.query, typeof req.query)
//   console.log('req.body: ',req.body)
//   const { apikey } = req.query
//   const validApiKeies = [123456]


//   if (!validApiKeies.includes(Number(apikey))) {
//     return res.status(401).json('유효한 정보가 아닙니다!')
//   }
//   res.status(200).json({
//     name: 'First Todos API!'
//   })
// })

// router.post('/', (req, res) => {
//   console.log('req.body: ', req.body)
//   res.status(200).json(true)
// })

// // 수정
// router.put('/:id', (req, res) => {
//   console.log('req.params: ', req.params)
//   res.status(200).json(true)
// })
// // delete
// router.delete('/:hun', (req, res) => {
//   console.log('req.body: ', req.body)
//   const { id } = req.body
//   res.status(200).json(true)
// })


// Read
router.get('/', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))

  res.status(200).json(todos)
})

// Create
router.post('/', (req, res) => {
  const { title } = req.body

  let todos = {}
  try {
    todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  } catch(error) {
    fs.mkdirSync(todosDir)
    fs.writeFileSync(todosFile, '{}')
  }

  todos[nanoid()] = { title }
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))
  
  res.status(200).json({ title })
})

// Update
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf-8'))
  todos[id].title = title

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(todos[id])
})

// Delete
router.delete('/:id', (req, res) => {
 const { id } = req.params

 const todos = JSON.parse(fs.readFileSync(todosFile, 'utf-8'))
 delete todos[id]

 fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

 res.status(200).json(true)
})

module.exports = router