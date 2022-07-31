import * as actionTypes from '../Actions/ActionType'

const initstate = {
    token: localStorage.getItem("token"),
    error: "",
    message: "",
    userId: "",
    user: {},
    userTransaction: []
}

const store = (state = initstate, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: "",
                message: ""
            };
        case actionTypes.SIGNUP_FAILED:
            return {
                ...state,
                error: action.error,
                user: {},
                token: null,
                message: ""
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: "",
                message: ""
            };
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
                user: {},
                message: "",
                token: null
            }
        case actionTypes.CHECK_USER:
            return {
                ...state,
                error: "",
                message: "",
                token: null,
                user: {},
                userId: ""
            }
        case actionTypes.USER_NOT_FOUND:
            return {
                ...state,
                message: action.message,
                user: {},
                error: "",
                token: null
            }
        case actionTypes.CHECK_OTP:
            return {
                ...state,
                error: "",
                user: {},
                message: "",
                token: null
            }
        case actionTypes.CHECK_OTP_FAILED:
            return {
                ...state,
                message: action.message,
                error: "",
                user: {},
                token: null,
                userId: ""
            }
        case actionTypes.UPDATE_PASSWORD:
            return {
                ...state,
                user: {},
                error: "",
                message: "",
                token: null
            }
        case actionTypes.EDIT_PROFILE:
            return {
                ...state,
                error: "",
                message: "",
                user: action.user
            }
        case actionTypes.GET_SINGLE_USER:
            return {
                ...state,
                error: "",
                message: "",
                user: action.user
            }
        case actionTypes.GET_SINGLE_USER_FAILED:
            return {
                ...state,
                error: "",
                message: "",
                user: {},
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                error: "",
                message: "",
                token: null,
                userId: "",
                user: {}
            }
        case actionTypes.CHANGE_PASSWORD:
            return {
                ...state,
                error: "",
                message: ""
            }
        case actionTypes.CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                message: action.message,
                error: ""
            }
        case actionTypes.GET_USER_TRANSACTION:
            return {
                ...state,
                userTransaction: action.userTransaction
            }
        case actionTypes.GET_USER_TRANSACTION_FAILED:
            return {
                ...state
            }
        case actionTypes.REEDOM_MONEY:
            return{
                ...state
            }
        case actionTypes.REEDOM_MONEY_FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}

export default store