import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'
;
export default function(SpecificComponent, option, adminRouter = null) {
    // option : null(=> 아무나 출입 가능), true(=> 로그인 유저만), false(=>로그인 유저는 출입 불가)
    // adminRouter : true(=> 관리자 계정만 접근할 페이지)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function AuthenticationCheck() {
        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //분기처리
                if(!response.payload.isAuth) {
                    //로그인 하지 않은 상태
                    if(option) { //로그인 회원만
                        navigate('/login')
                    }

                } else {
                    //로그인 한 상태
                    if (adminRouter && !response.payload.isAdmin) { //관리자 계정만
                        navigate('/')
                    } else {
                        if (!option) { //로그인 회원 접근X
                            navigate('/')
                        }
                    }

                }
            })

        },[])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}