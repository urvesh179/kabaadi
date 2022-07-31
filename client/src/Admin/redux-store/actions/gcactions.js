import * as actionTypes from './actionTypes'
import axios from '../../../axios'

export const addgc = (gc) => {
    return async dispatch => {
        await axios.post("/api/admin/registergc", gc).then((res) => {
            dispatch({
                type: actionTypes.ADD_GARBAGE_COLLECTOR,
            })
        }).catch((e) => {
            dispatch({
                type: actionTypes.ADD_GARBAGE_COLLECTOR_FAILED,
                message: "Invalid Data"
            })
            throw new Error()
        })
    }
}

export const getgc = () => {
    return async dispatch => {
        await axios.get("/api/admin/getgc").then((res) => {
            dispatch({
                type: actionTypes.GET_GARBAGE_COLLECTOR,
                gc: res.data
            })
        }).catch((e) => {
            dispatch({
                type: actionTypes.GET_GARBAGE_COLLECTOR_FAILED,
                error: "get garbage collector failed"
            })
        })
    }
}

export const cancelgc = (id) => {
    return async dispatch => {
        await axios.post("/api/admin/cancelgc", { id }).then(res => {
            dispatch({
                type: actionTypes.CANCEL_GC
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.CANCEL_GC_FAILED,
                error: e
            })
        })
    }
}

export const getadminwallet = () => {
    return async dispatch => {
        await axios.get("/api/admin/getadminwallet").then((res) => {
            dispatch({
                type: actionTypes.GET_ADMIN_WALLET,
                adminAmount: res.data.wa
            })
        }).catch((e) => {
            dispatch({
                type: actionTypes.GET_ADMIN_WALLET_FAILED
            })
        })
    }
}

export const sendmoney = (id, money) => {
    return async dispatch => {
        await axios.post("/api/admin/sendmoney", { id, money }).then((res) => {
            dispatch({
                type: actionTypes.SEND_MONEY_SUCCESS,
            })
        }).catch((e) => {
            dispatch({
                type: actionTypes.SEND_MONEY_SUCCESS_FAILED
            })
        })
    }
}

export const getTransaction = () => {
    return async dispatch => {
        await axios.get("/api/admin/gettransaction").then((res) => {
            dispatch({
                type: actionTypes.GET_ADMIN_TRANSACTION,
                adminTransaction: res.data
            })
        }).catch((e) => {
            dispatch({
                type: actionTypes.GET_ADMIN_TRANSACTION_FAILED
            })
        })
    }
}

export const addadminwallet = (amount) => {
    return async dispatch => {
        await axios.post("/api/admin/addadminwallet", { amount }).then((res) => {
            dispatch({
                type: actionTypes.ADD_ADMIN_WALLET
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.ADD_ADMIN_WALLET_FAILED
            })
        })
    }
}

export const getorders = (city) => {
    return async dispatch => {
        await axios.post("/api/admin/getorders", { city }).then(res => {
            dispatch({
                type: actionTypes.GET_ORDER_SUCCESS,
                orders: res.data
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.GET_ORDER_FAILED,
            })
        })
    }
}

export const creategarbage = (garbage) => {
    return async dispatch => {
        await axios.post("/api/admin/creategarbage", { garbage }).then(res => {
            dispatch({
                type: actionTypes.CREATE_GARBAGE
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.CREATE_GARBAGE_FAILED
            })
        })
    }
}

export const editgarbage = (garbage) => {
    return async dispatch => {
        await axios.post("/api/admin/editgarbage", { garbage }).then(res => {
            dispatch({
                type: actionTypes.EDIT_GARBAGE
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.EDIT_GARBAGE_FAILED
            })
        })
    }
}

export const deletegarbage = (garbage) => {
    return async dispatch => {
        await axios.post("/api/admin/deletegarbage", { garbage }).then(res => {
            dispatch({
                type: actionTypes.DELETE_GARBAGE
            })
        }).catch(e => {
            dispatch({
                type:actionTypes.DELETE_GARBAGE_FAILED
            })
        })
    }
}

export const getdata=()=>{
    return async dispatch=>{
        await axios.get('/api/admin/getdata').then(res=>{
            dispatch({
                type:actionTypes.GET_DATA,
                payload:res.data
            })
        }).catch(e=>{
            dispatch({
                type:actionTypes.GET_DATA_FAILED
            })
        })
    }
}

export const getrecordbycity=(city)=>{
    return async dispatch=>{
        await axios.get('api/admin/getrecordbycity',{
            params:{
                city
            }
        }).then(res=>{
            dispatch({
                type:actionTypes.GET_RECORD_BY_CITY,
                payload:res.data
            })
        }).catch(e=>{
            dispatch({
                type:actionTypes.GET_RECORD_BY_CITY_FAILED
            })
        })
    }
}