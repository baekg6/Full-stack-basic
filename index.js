//module 연결
const express = require('express')
const app = express()
const port = 3000 //서버 포트

//DB연결
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://baekg:100g@basic.froow67.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true, //오류 제어
}).then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//페이지 출력 라우터
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//연결 확인
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})