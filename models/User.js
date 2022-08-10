const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// userSchema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백제거
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number, //사용자:0, 관리자:0제외
    default: 0,
  },
  iamge: String,
  token: {
    //유효성 관리
    type: String,
  },
  tokenExp: {
    //토큰 유효기간
    type: Number,
  },
});

//비밀번호 암호화
userSchema.pre("save", function (next) {
  //save전에 function 적용

  var user = this; //userSchema

  if (user.isModified("password")) { //비밀번호 변경 시만 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; //암호화 된 비밀번호 저장
        next();
      });
    });
  } else {
    next();
  }
});

//모델과 스키마 연결
const User = mongoose.model("User", userSchema);

//외부에서 사용 가능하도록 exports
module.exports = { User };
