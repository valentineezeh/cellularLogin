import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SOCIAL_LOGIN_ERROR, SET_CURRENT_USER } from './types';


export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user,
});

export const socialLoginAction = (code, socialLogin) => dispatch => axios.get(
    `http://localhost:8009/api/user/login/${socialLogin}/callback?code=${code}`
).then((response) => {
    const { token } = response.data.user;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(jwt.decode(token)));
    dispatch(setCurrentUser(response.data.user));
    return response;
}).catch((error) => {
    dispatch({
        type: SOCIAL_LOGIN_ERROR,
        error: error.response.data,
    });
    return error;
});