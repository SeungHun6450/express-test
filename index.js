// npm i express cors
const express = require('express')
const cores = require('cors')

const app = express() 
app.use(express.json())
app.use(cors())
app.use('/', (req, res) => {
  res.status(200).json({
    name: 'Hun'
  })
})

// http://localhost:1234, 1234는 지정 포트
app.listen(1234, () => {
  console.log('서버 등장~')
})