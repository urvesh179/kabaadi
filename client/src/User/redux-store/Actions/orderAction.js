import * as actionsTypes from './ActionType'
import axios from '../../../axios'


export const sendorder = (order) => {
    const token = localStorage.getItem('token')
    return async dispatch => {
        await axios.post("api/order/sendorder", order, {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then((res) => {
            dispatch({
                type: actionsTypes.SEND_ORDER
            })
        }).catch((e) => {
            dispatch({
                type: actionsTypes.SEND_ORDER_FAILED,
                error: e.message
            })
        })
    }
}

export const getorders = () => {
    const token = localStorage.getItem('token')
    return async dispatch => {
        await axios.get("api/order/getorders", {
            headers: {
                authorization: "Bearer " + token
            }
        }).then((res) => {
            dispatch({
                type: actionsTypes.GET_ORDERS,
                orders: res.data
            })
        }).catch((e) => {
            dispatch({
                type: actionsTypes.GET_ORDERS_FAILED,
                error: e.message
            })
        })
    }
}

export const cancelorder = (id) => {
    const token = localStorage.getItem('token')
    return async dispatch => {
        await axios.post("api/order/cancelorder", { id }, {
            headers: {
                authorization: "Bearer " + token
            }
        }).then(res => {
            dispatch({
                type: actionsTypes.CANCEL_ORDER,
            })
        }).catch(e => {
            dispatch({
                type: actionsTypes.CANCEL_ORDER_FAILED,
                error: e.message
            })
        })
    }
}

export const updateorderaddress = (id, address) => {
    const token = localStorage.getItem('token')
    return async dispatch => {
        await axios.post("http://localhost:5000/api/order/updateorderaddress", { id, address }, {
            headers: {
                authorization: "Bearer " + token
            }
        }).then((res) => {
            dispatch({
                type: actionsTypes.UPDATE_ORDER_ADDRESS
            })
        }).catch(e => {
            dispatch({
                type: actionsTypes.UPDATE_ORDER_ADDRESS_FAILED,
                error: e.message
            })
        })
    }
}

export const getgarbage = () => {
    return async dispatch => {
        await axios.get('/api/users/getgarbage').then(res => {
            dispatch({
                type: actionsTypes.GET_GARBAGE,
                garbage: res.data
            })
        }).catch(e => {
            dispatch({
                type: actionsTypes.GET_GARBAGE_FAILED
            })
        })
    }
}

export const getconfirmorder = (id) => {
    const token = localStorage.getItem('token')
    return async dispatch => {
        await axios.get('/api/order/getconfirmorder', {
            headers: {
                authorization: "Bearer " + token
            },
            params: {
                id
            }
        }).then(res => {
            dispatch({
                type: actionsTypes.GET_CONFIRM_ORDER,
                confirmOrder: res.data.order,
                email: res.data.email
            })
        }).catch(e => {
            dispatch({
                type: actionsTypes.GET_CONFIRM_ORDER_FAILED
            })
        })
    }
}

