import React, { useEffect } from 'react'
import * as actions from '../../redux-store/Actions/garbagecollactions'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

import classes from './Dashboard.css'
import spendmoney from '../../../images/spendmoney.png'
import cart from '../../../images/cart.jpg'
import garbage from '../../../images/garbage.png'
import todayorder from '../../../images/todayorder.png'

const Dashboard = (props) => {

    const history=useHistory()

    useEffect(() => {
        props.gettodayorder()
        props.gettommoroworder()
        props.getpreviousorder()
        props.getgcdata()
    }, [])

    const oncomplete=(e,id)=>{
        e.preventDefault()
        history.push({pathname:'/gc/completeorder/'+id})
    }

    let card = (
        <div className={classes.cards}>
            <div className={classes.card}>
                <img src={spendmoney} className={classes.img} alt="spendmoney" />
    <span className={classes.amount}>&#x20B9; {props.totalSpend}</span><br />
                <span className={classes.title}>Total Spend</span>
            </div>
            <div className={classes.card}>
                <img src={cart} className={classes.img} alt="cart" />
    <span className={classes.amount}>{props.totalCompletedOrder}</span><br />
                <span className={classes.title}>Completed Orders</span>
            </div>
            <div className={classes.card}>
                <img src={garbage} className={classes.img} alt="garbage" />
    <span className={classes.amount}>KG {props.totalGarbageWeight}</span><br />
                <span className={classes.title}>Recieved Garbage</span>
            </div>
            <div className={classes.card}>
                <img src={todayorder} className={classes.img} alt="todayorder" />
    <span className={classes.amount}>{props.todayOrder.length}</span><br />
                <span className={classes.title} style={{marginLeft:"18px"}}>Today Pending Orders</span>
            </div>
        </div>
    )
    let todaypickup = (
        <div className={classes.todaypickup}>
            <h4 style={{ margin: "30px 0 0px 130px", fontWeight: "bold" }}>Today's Pending Pickup</h4>
            {props.todayOrder.length === 0 ? <div className={classes.ordercard}><h5 style={{ marginLeft: "400px", padding: "10px" }}>No Orders</h5></div> : null}
            {props.todayOrder?.map(orders => {
                return (
                    <div className={classes.ordercard} key={orders._id}>
                        <div style={{ width: "70%" }}>
                            <h5 style={{ marginLeft: "10px", paddingTop: "10px" }}>OrderId: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders._id}</span> </h5>
                            <h5 style={{ marginLeft: "10px" }}>Pickup Addres: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders.address}</span></h5>
                            <h5 style={{ marginLeft: "10px", paddingBottom: "10px" }}>Pickup Slot: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders.pickupslot}</span></h5>
                        </div>
                        <div>
                            <button className={classes.completebutton} onClick={(e)=>oncomplete(e,orders._id)}>Complete order</button>
                        </div>

                    </div>
                )
            })}
        </div>
    )

    let tommorowpickup = (
        <div className={classes.todaypickup}>
            <h4 style={{ margin: "30px 0 0px 130px", fontWeight: "bold" }}>Tommorow Pickup</h4>
            {props.tommorowOrder.length === 0 ? <div className={classes.ordercard}><h5 style={{ marginLeft: "400px", padding: "10px" }}>No Orders</h5></div> : null}
            {props.tommorowOrder?.map(orders => {
                return (
                    <div className={classes.ordercard} key={orders._id}>
                        <div style={{ width: "70%" }}>
                            <h5 style={{ marginLeft: "10px", paddingTop: "10px" }}>OrderId: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders._id}</span> </h5>
                            <h5 style={{ marginLeft: "10px" }}>Pickup Addres: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders.address}</span></h5>
                            <h5 style={{ marginLeft: "10px", paddingBottom: "10px" }}>Pickup Slot: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders.pickupslot}</span></h5>
                        </div>
                    </div>
                )
            })}
        </div>
    )

    let previouspendingorder = (
        <div className={classes.todaypickup}>
            <h4 style={{ margin: "30px 0 0px 130px", fontWeight: "bold" }}>Previous Pending Pickup</h4>
            {props.previousPendingOrder.length === 0 ? <div className={classes.ordercard}><h5 style={{ marginLeft: "400px", padding: "10px" }}>No Orders</h5></div> : null}
            {props.previousPendingOrder?.map(orders => {
                return (
                    <div className={classes.ordercard} key={orders._id}>
                        <div style={{ width: "70%" }}>
                            <h5 style={{ marginLeft: "10px", paddingTop: "10px" }}>OrderId: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders._id}</span> </h5>
                            <h5 style={{ marginLeft: "10px" }}>Pickup Addres: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders.address}</span></h5>
                            <h5 style={{ marginLeft: "10px", paddingBottom: "10px" }}>Pickup Slot: <span style={{ fontWeight: "normal", fontSize: "17px" }}>{orders.pickupslot}</span></h5>
                        </div>
                        <div>
                            <button className={classes.completebutton} onClick={(e)=>oncomplete(e,orders._id)}>Complete order</button>
                        </div>

                    </div>
                )
            })}
        </div>
    )
    return (
        <div className={classes.container}>
            {card}
            {todaypickup}
            {tommorowpickup}
            {previouspendingorder}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        todayOrder: state.GC.todayOrder,
        tommorowOrder: state.GC.tommorowOrder,
        previousPendingOrder: state.GC.previousPendingOrder,
        totalSpend:state.GC.totalSpend,
        totalGarbageWeight:state.GC.totalGarbageWeight,
        totalCompletedOrder:state.GC.totalCompletedOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        gettodayorder: () => dispatch(actions.gettodayorder()),
        gettommoroworder: () => dispatch(actions.gettommoroworder()),
        getpreviousorder: () => dispatch(actions.getpreviousorder()),
        getgcdata:()=>dispatch(actions.getgcdata())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)