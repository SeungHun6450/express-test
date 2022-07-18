// npm i express cors
// npm i nodemon -> package.json에서 scripts를 "start": "nodemon index.js"로 변경
const express = require('express')
const cors = require('cors')

global.appRoot = __dirname

const app = express() 
app.use(express.json())
app.use(cors())
app.use('/api/todos', require('./routes/api/todos.js'))

// app.use('/', (req, res) => {
//   res.status(200).json({
//     name: 'Hun'
//   })
// })

// 다른 서비스에 올렸을 때, 해당 서비스의 환경에서 필요로 하는 port를 사용하기 위해 선언
const port = process.env.PORT || 1234
// http://localhost:1234/api/todos?a=1&b=Hun
app.listen(port, () => {
  console.log('서버 등장~')
})