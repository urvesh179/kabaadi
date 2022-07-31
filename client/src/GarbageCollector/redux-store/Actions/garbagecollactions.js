import * as actionTypes from './actionTypes'
import axios from '../../../axios'

export const gclogin = (gc) => {
    return async dispatch => {
        await axios.post('api/gc/gclogin', gc).then(res => {
            localStorage.setItem("gctoken", res.data.token)
            localStorage.setItem("gcId", res.data.gc._id)
            dispatch({
                type: actionTypes.GARBAGE_COLLECTOR_LOGIN,
                gctoken: res.data.token,
                gcId: res.data.gc._id
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.GARBAGE_COLLECTOR_LOGIN_FAILED,
                error: "Invalid Email or Password"
            })
            throw new Error()
        })
    }
}

export const getGCById = () => {
    const token = localStorage.getItem("gctoken")
    return async dispatch => {
        await axios.get("api/gc/getgc", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            dispatch({
                type: actionTypes.GET_GARBAGE_COLLECTOR,
                error: "",
                gc: response.data
            })

        }).catch(error => {
            dispatch({
                type: actionTypes.GET_GARBAGE_COLLECTOR_FAILED
            });
        })
    }
}

export const logout = () => {

    const token = localStorage.getItem("gctoken");
    return async dispatch => {
        await axios.get("api/gc/logout", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => {
            localStorage.removeItem("gctoken");
            localStorage.removeItem("gcId");
            dispatch({
                type: actionTypes.LOGOUT_SUCCESS,
            })
        }).catch(error => {
            dispatch({
                type: actionTypes.LOGOUT_FAILED
            })
        })
    }
}

export const gettodayorder = () => {
    const token = localStorage.getItem("gctoken");
    return async dispatch => {
        await axios.get("api/gc/todaypickup", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(resp => {
            dispatch({
                type: actionTypes.GET_TODAY_ORDERS,
                todayOrder: resp.data
            })
        }).catch(error => {
            dispatch({
                type: actionTypes.GET_TODAY_ORDERS_FAILED
            })
        })
    }
}

export const gettommoroworder = () => {
    const token = localStorage.getItem("gctoken");
    return async dispatch => {
        await axios.get("api/gc/tommorowpickup", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(resp => {
            dispatch({
                type: actionTypes.GET_TOMMOROW_ORDERS,
                tommorowOrder: resp.data
            })
        }).catch(error => {
            dispatch({
                type: actionTypes.GET_TOMMOROW_ORDERS_FAILED
            })
        })
    }
}

export const getpreviousorder = () => {
    const token = localStorage.getItem("gctoken");
    return async dispatch => {
        await axios.get("api/gc/previouspendingorder", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(resp => {
            dispatch({
                type: actionTypes.GET_PREVIOUS_ORDERS,
                previousPendingOrder: resp.data
            })
        }).catch(error => {
            dispatch({
                type: actionTypes.GET_PREVIOUS_ORDERS_FAILED
            })
        })
    }
}

export const getcompletedorder = () => {
    const token = localStorage.getItem("gctoken");
    return async dispatch => {
        await axios.get("api/gc/completedorders", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(resp => {
            dispatch({
                type: actionTypes.GET_COMPLETED_ORDERS,
                completedOrder: resp.data
            })
        }).catch(error => {
            dispatch({
                type: actionTypes.GET_COMPLETED_ORDERS_FAILED
            })
        })
    }
}

export const getgcTransaction = () => {

    const token = localStorage.getItem("gctoken")
    return async dispatch => {
        await axios.get('/api/gc/gctransaction', {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(res => {
            dispatch({
                type: actionTypes.GET_GC_TRANSACTION,
                gcTransaction: res.data
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.GET_GC_TRANSACTION_FAILED
            })
        })
    }
}

export const getorderbyid = (id) => {
    const token = localStorage.getItem("gctoken")
    return async dispatch => {
        await axios.get('/api/gc/getorderbyid', {
            headers: {
                authorization: 'Bearer ' + token
            },
            params: {
                id
            }
        }).then(res => {
            dispatch({
                type: actionTypes.GET_ORDER_BY_ID,
                order: res.data
            })
        }).catch(e => {
            dispatch({
                type: actionTypes.GET_ORDER_BY_ID_FAILED
            })
        })
    }
}

export const sendconfirmedorder = (order) => {
    const token = localStorage.getItem("gctoken")
    return async dispatch => {
        await axios.post('/api/gc/sendconfirmedorder',order,{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(res=>{
            dispatch({
                type:actionTypes.SEND_CONFIRMED_ORDER
            })
        }).catch(e=>{
            dispatch({
                type:actionTypes.SEND_CONFIRMED_ORDER_FAILED
            })
        })
    }
}

export const getgcdata=()=>{
    const token = localStorage.getItem("gctoken")
    return async dispatch=>{
        await axios.get('/api/gc/getgcdata',{
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(res=>{
            dispatch({
                type:actionTypes.GET_GC_DATA,
                payload:res.data
            })
        }).catch(e=>{
            dispatch({
                type:actionTypes.GET_GC_DATA_FAILED
            })
        })
    }
}
