import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    gctoken: localStorage.getItem("gctoken"),
    error: "",
    gcId: "",
    gc: {},
    order:{},
    gcTransaction: [],
    todayOrder: [],
    tommorowOrder: [],
    previousPendingOrder: [],
    completedOrder: [],
    totalSpend:null,
    totalGarbageWeight:null,
    totalCompletedOrder:null
}

const store = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GARBAGE_COLLECTOR_LOGIN:
            return {
                ...state,
                gctoken: action.gctoken,
                gcId: action.gcId,
                error: ""
            }
        case actionTypes.GARBAGE_COLLECTOR_LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
                gctoken: null,
                gcId: ""
            }
        case actionTypes.GET_GARBAGE_COLLECTOR:
            return {
                ...state,
                gc: action.gc,
                error: ""
            }
        case actionTypes.GET_GARBAGE_COLLECTOR_FAILED:
            return {
                ...state,
                gc: {},
                error: ""
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                gc: {},
                gctoken: "",
                gcId: "",
                error: ""
            }
        case actionTypes.LOGOUT_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_TODAY_ORDERS:
            return {
                ...state,
                todayOrder: action.todayOrder
            }
        case actionTypes.GET_TODAY_ORDERS_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_TOMMOROW_ORDERS:
            return {
                ...state,
                tommorowOrder: action.tommorowOrder
            }
        case actionTypes.GET_TOMMOROW_ORDERS_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_PREVIOUS_ORDERS:
            return {
                ...state,
                previousPendingOrder: action.previousPendingOrder
            }
        case actionTypes.GET_PREVIOUS_ORDERS_FAILED:
            return {
                ...state
            }
        case actionTypes.GET_COMPLETED_ORDERS:
            return {
                ...state,
                completedOrder: action.completedOrder
            }
        case actionTypes.GET_COMPLETED_ORDERS_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_GC_TRANSACTION:
            return {
                ...state,
                gcTransaction: action.gcTransaction
            }
        case actionTypes.GET_GC_TRANSACTION_FAILED:
            return {
                ...state
            }
        case actionTypes.GET_ORDER_BY_ID:
            return{
                ...state,
                order:action.order
            }
        case actionTypes.GET_ORDER_BY_ID_FAILED:
            return{
                ...state,
                order:{}
            }
        case actionTypes.SEND_CONFIRMED_ORDER:
            return{
                ...state,
                order:{}
            }
        case actionTypes.SEND_CONFIRMED_ORDER_FAILED:
            return{
                ...state
            }
        case actionTypes.GET_GC_DATA:
            return{
                ...state,
                totalSpend:action.payload.totalSpend,
                totalGarbageWeight:action.payload.totalGarbageWeight,
                totalCompletedOrder:action.payload.totalCompletedorder
            }
        case actionTypes.GET_GC_DATA_FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}

export default store