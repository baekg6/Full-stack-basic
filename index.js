//module 연결
const express = require("express");
const app = express();
const port = 3000; //서버 포트
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//apllication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json type
app.use(bodyParser.json());

//DB연결
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://baekg:100g@basic.froow67.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true, //오류 제어
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//페이지 출력 라우터
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//회원 가입 Register
app.post("/api/users/register", (req, res) => {
  //클라이언트에서 가져온 회원 가입 정보를 DB에 저장
  const user = new User(req.body);

  user.save((err, userInfo) => {
    //DB에 저장
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//연결 확인
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
