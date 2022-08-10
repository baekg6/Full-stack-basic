//module 연결
const express = require("express");
const app = express();
const port = 3000; //서버 포트
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const config = require("./config/key");

//apllication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json type
app.use(bodyParser.json());
app.use(cookieParser());

//DB연결
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useUnifiedTopology: true, //오류 제어
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//페이지 출력 라우터
app.get("/", (req, res) => {
  res.send("Hello World :)");
});

//회원 가입 Register
app.post("/api/users/register", (req, res) => {
  //클라이언트에서 가져온 회원 가입 정보를 DB에 저장
  const user = new User(req.body);

  //DB에 저장하기 전에 암호화 필요 -> User.js에 작성

  user.save((err, userInfo) => {
    //DB에 저장
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인
app.post("/api/users/login", (req, res) => {
  
  // 요청된 이메일 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {  if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력하신 이메일 정보가 없습니다."
      });
    }

    //요청 이메일이 있을 때, 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다."
        })
      }

      //비밀번호가 같으면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //쿠키에 토큰 저장
        //쿠키뿐 아니라 로컬 스토리지, 세션 등에 저장 가능
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        });
      });
    });
  });
});

//인증 기능 Auth
app.get("/api/users/auth", auth, (req, res) => {

  //미들웨어 통과(authetication이 True일 때만)
  res.status(200).json({
    //인증된 유저 정보 접근
    _id: req.user._id,
    isAdmin: req.user.role===0? false : true, //일반유저:0, 관리자:0 외
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

//연결 확인
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
