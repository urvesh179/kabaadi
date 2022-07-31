import * as actionTypes from '../Actions/ActionType'

const initstate = {
    orders: [],
    garbage:[],
    error: "",
    confirmOrder:{},
    email:""
}

const store = (state = initstate, action) => {
    switch (action.type) {
        case actionTypes.SEND_ORDER:
            return {
                ...state,
                error: ""
            }
        case actionTypes.SEND_ORDER_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.orders,
                error: ""
            }
        case actionTypes.GET_ORDERS_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.CANCEL_ORDER: {
            return {
                ...state,
            }
        }
        case actionTypes.CANCEL_ORDER_FAILED: {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.UPDATE_ORDER_ADDRESS: {
            return {
                ...state,
                error: ""
            }
        }
        case actionTypes.UPDATE_ORDER_ADDRESS_FAILED: {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.GET_GARBAGE:{
            return{
                ...state,
                garbage:action.garbage
            }
        }
        case actionTypes.GET_GARBAGE_FAILED:
            return{
                ...state
            }
        case actionTypes.GET_CONFIRM_ORDER:
            return{
                ...state,
                confirmOrder:action.confirmOrder,
                email:action.email
            }
        case actionTypes.GET_CONFIRM_ORDER_FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}

export default store