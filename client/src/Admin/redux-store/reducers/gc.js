import * as actionTypes from '../actions/actionTypes'

const initialState = {
    gcs: [],
    orders: [],
    adminWalletAmount: null,
    adminTransaction: [],
    error: "",
    totalSpend:null,
    totalGarbageWeight:null,
    totalOrder:null,
    totalUser:null,
    Paper:{},
    Plastic:{},
    Metal:{},
    Ewaste:{},
    Other:{}
}

const store = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GARBAGE_COLLECTOR:
            return {
                ...state,
                gcs: action.gc
            }
        case actionTypes.GET_GARBAGE_COLLECTOR_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.ADD_GARBAGE_COLLECTOR:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ADD_GARBAGE_COLLECTOR_FAILED:
            return {
                ...state,
                error: action.message
            }
        case actionTypes.CANCEL_GC:
            return {
                ...state,
                error: ""
            }
        case actionTypes.CANCEL_GC_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.GET_ADMIN_WALLET:
            return {
                ...state,
                adminWalletAmount: action.adminAmount
            }
        case actionTypes.GET_ADMIN_WALLET_FAILED:
            return {
                ...state,
            }
        case actionTypes.SEND_MONEY_SUCCESS:
            return {
                ...state,
                error: ''
            }
        case actionTypes.SEND_MONEY_SUCCESS_FAILED:
            return {
                ...state
            }
        case actionTypes.GET_ADMIN_TRANSACTION:
            return {
                ...state,
                adminTransaction: action.adminTransaction
            }
        case actionTypes.GET_ADMIN_TRANSACTION_FAILED:
            return {
                ...state
            }
        case actionTypes.ADD_ADMIN_WALLET:
            return {
                ...state
            }
        case actionTypes.ADD_ADMIN_WALLET_FAILED:
            return {
                ...state
            }
        case actionTypes.GET_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders
            }
        case actionTypes.GET_ORDER_FAILED:
            return {
                ...state
            }
        case actionTypes.CREATE_GARBAGE:
            return {
                ...state
            }
        case actionTypes.CREATE_GARBAGE_FAILED:
            return {
                ...state
            }
        case actionTypes.EDIT_GARBAGE:
            return {
                ...state
            }
        case actionTypes.EDIT_GARBAGE_FAILED:
            return {
                ...state
            }
        case actionTypes.DELETE_GARBAGE:
            return{
                ...state
            }
        case actionTypes.DELETE_GARBAGE_FAILED:
            return{
                ...state
            }
        case actionTypes.GET_DATA:
            return{
                ...state,
                totalSpend:action.payload.totalSpend,
                totalGarbageWeight:action.payload.totalGarbageWeight,
                totalOrder:action.payload.totalOrder,
                totalUser:action.payload.totalUser
            }
        case actionTypes.GET_RECORD_BY_CITY:
            return{
                ...state,
                Paper:action.payload.paper,
                Plastic:action.payload.plastic,
                Metal:action.payload.metal,
                Ewaste:action.payload.ewaste,
                Other:action.payload.other
            }
        case actionTypes.GET_RECORD_BY_CITY_FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}

export default store