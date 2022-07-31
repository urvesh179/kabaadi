import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Header.css'
import Logo from '../../../images/kabadi-mart.png'
import * as actions from '../../redux-store/Actions/garbagecollactions'

const Header = (props) => {

    const history = useHistory()

    useEffect(() => {
        async function fetchRecord() {
            await props.getGCById()
        }
        fetchRecord()
    }, [])

    const logout = async (e) => {
        e.preventDefault()
        await props.logout()
        history.push({ pathname: '/gc' })
    }

    return (
        <div>
            <div className={classes.container}>
                <Link to="/gc/dashboard" ><img src={Logo} className={classes.logo} alt="logo" /></Link>
                <Link to="/gc/dashboard" className={classes.brandname}><h3>Kabadimart</h3><h6 style={{ marginTop: "-10px", fontSize: "12px", color: "#476E4B" }}>Garbage Collector({props.gc.city})</h6></Link>
                <Link to="/gc/dashboard" className={classes.home}><h4>Dashboard</h4></Link>
                <Link to="/gc/comorders" className={classes.scrap}><h4>Orders</h4></Link>
                <Link to="/gc/wallet" className={classes.addgarbage}><h4 >Wallet</h4></Link>
                <div onClick={(e) => logout(e)} style={{ textDecoration: "none", left: "1050px", backgroundColor: "green", color: "white", height: "51px" }} className={classes.auth}><h4 style={{ textAlign: "center" }}>Logout</h4></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        gc: state.GC.gc
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGCById: () => dispatch(actions.getGCById()),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)