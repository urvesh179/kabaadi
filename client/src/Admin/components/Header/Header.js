import React, { useState } from 'react'
import { Link, useHistory,withRouter } from 'react-router-dom'

import classes from './Header.css'
import Logo from '../../../images/kabadi-mart.png'

const Header = (props) => {
    const history = useHistory()
    const [dropdown, setdropdown] = useState(false)

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("admin")
        history.push({ pathname: '/admin' })
    }

    const hidedropdown = (e) => {
        e.preventDefault()
        setdropdown(prevstate => !prevstate)
    }

    const dashboardcolor = props.location.pathname === '/admin/dashboard' ? { backgroundColor: "green", color: "white" } : {}
    const gcdetailcolor = props.location.pathname === '/admin/gcdetails' ? { backgroundColor: "green", color: "white" } : {}
    const addgarbagecolor = props.location.pathname === '/admin/addgarbage' ? { backgroundColor: "green", color: "white" } : {}
    const admincolor = props.location.pathname === '/admin/wallet' ? { backgroundColor: "green", color: "white",textDecoration: "none", left: "1050px", color: "white", height: "51px" } : {textDecoration: "none", left: "1050px", color: "white", height: "51px"}

    return (
        <div>
            {dropdown ? <div className={classes.Backdrop} onClick={() => setdropdown(false)}></div> : null}
            <div className={classes.container}>
                <Link to="/admin/dashboard" ><img src={Logo} className={classes.logo} alt="logo" /></Link>
                <Link to="/admin/dashboard" className={classes.brandname}><h3 >Kabadimart</h3><h6 style={{ marginTop: "-10px" }}>Admin</h6></Link>
                <Link to="/admin/dashboard" className={classes.home} style={dashboardcolor}><h4 >Dashboard</h4></Link>
                <Link to="/admin/gcdetails" className={classes.scrap} style={gcdetailcolor}><h4 >Collector</h4></Link>
                <Link to="/admin/addgarbage" className={classes.addgarbage} style={addgarbagecolor}><h4 >Add_Garbage</h4></Link>
                <div onClick={(e) => hidedropdown(e)} style={admincolor} className={classes.auth}><h4 style={{ textAlign: "center" }}>Admin</h4></div>
            </div>
            {dropdown ? <div className={classes.container1}>
                <div onClick={() => setdropdown(false)}><Link to='/admin/wallet' style={{ textDecoration: "none" }}><h5 ><span className={classes.option} style={{ marginBottom: "10px" }}>My Wallet</span></h5></Link></div>
                <h5><span className={classes.option} onClick={(e) => logout(e)}>Logout</span></h5><br />
            </div> : null}
        </div>
    )
}

export default withRouter(Header)