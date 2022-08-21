import axios from 'axios';
import {
    LOGIN_USER
} from './types';


export function loginUser(dataTosubmit) {
    //http method를 이용해서 데이터를 전송
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data) //data를 request에 저장

    return { //-> reducer로 전달
        //(previousState, action) => nextState
        type: "LOGIN_USER",
        payload: request
        
    }
}