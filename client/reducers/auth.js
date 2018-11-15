import { SET_CURRENT_USER, SIGN_UP_ERRORS, DELETE_ERROR_MESSAGE } from '../actions/types.js';

const initialState = {
    isAuthenticated: false,
    user: {},
    error: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: true,
                user: action.user
            };
        case SIGN_UP_ERRORS:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error
            };
        case DELETE_ERROR_MESSAGE:
            return {
                error: {}
            };
        default: return state;
    }
};