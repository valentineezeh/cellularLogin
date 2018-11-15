import { combineReducers } from 'redux';
import auth from './auth.js';
import socialLoginReducer from './socialLogin';


export default combineReducers({
    auth,
    socialLoginReducer
});
