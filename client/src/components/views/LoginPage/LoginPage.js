import { Axios } from 'axios'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";
//페이지 이동

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state선언 -> 서버에 전달할 값
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  
  // 타이핑 할 때 변화할 수 있도록 함수 선언
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const OnPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지 refresh 방지

    // console.log("Email: ", Email)
    // console.log("Password: ", Password)
    
    let body = {
      email: Email,
      password: Password
    }
    //dispatch로 action(loginUser)을 취한다
    dispatch(loginUser(body))
    .then(response => {
      //로그인 성공하면 LandingPage로 이동 
      if(response.payload.loginSuccess) {
        navigate('/') //root로 이동
      } else{
        alert("ERROR")
      }
    })
    
  }
  
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
    <form style={{display:'flex', flexDirection:'column'}}
    onSubmit={onSubmitHandler}>  
      <label>Email</label>
      <input type="email" value={Email} onChange={onEmailHandler}/>
      <label>Password</label>
      <input type="password" value={Password} onChange={OnPasswordHandler}/>
      
      <br/>
      <button type="submit">
        Login
      </button>
    </form>
      
    </div>
  )
}

export default LoginPage