const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors') // 解决跨域问题
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/actserver/template2/receive', async (req, res) => {
  const { type, mark } = req.body
  console.log(type, mark)
  if (type == 'tab' && mark == 'm1') {
    fs.readFile('./m1.json', (err, data) => {
      if (err) throw err
      res.send(JSON.parse(data))
    })
  } else {
    res.send('error')
  }
})

app.listen(3000, function () {
  console.log('Server started on port 3000')
})
