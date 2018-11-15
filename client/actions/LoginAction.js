import axios from 'axios';
import jwt from 'jsonwebtoken';
import swal from 'sweetalert';
import {
    SET_CURRENT_USER,
    SIGN_UP_ERRORS,
    DELETE_ERROR_MESSAGE

} from './types.js';
import setAuthorizationToken from '../utils/setAuthorizationToken.js';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const deleteErrorMessageSuccess = () => ({
    type: DELETE_ERROR_MESSAGE,
});

export const signUpError = error => ({
    type: SIGN_UP_ERRORS,
    error
});

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}

export const userLoginRequest = (userLoginData) => {
    return (dispatch) => {
        return axios.post('http://localhost:8009/api/user/login/', userLoginData).then(
            res => {
                const token = res.data.user.token;
                const message = res.data.message;

                swal(message);
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('user', JSON.stringify(jwt.decode(token)));
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwt.decode(token)));
            }
        ).catch((error) => {
            dispatch(signUpError(error.response.data));
        });
    };
};
