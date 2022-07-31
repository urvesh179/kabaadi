import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Header.css'
import Logo from '../../../images/kabadi-mart.png'
import * as actions from '../../redux-store/Actions/authAction'

class Header extends Component {
    state = {
        dropdown: false,
    }

    componentDidMount = async () => {
        await this.props.getUserById()
    }

    hidedropdown = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ dropdown: !prevstate.dropdown }))
    }

    onlogout = async (e) => {
        e.preventDefault()
        await this.props.logout()
        this.setState({ dropdown: false })
        this.props.history.push('/')
    }

    render() {
        const homecolor = this.props.location.pathname === '/' ? { backgroundColor: "green", color: "white" } : {}
        const scrapratecolor = this.props.location.pathname === '/scraprate' ? { backgroundColor: "green", color: "white" } : {}
        const pickupcolor = this.props.location.pathname === '/pickuprquest' ? { backgroundColor: "green", color: "white" } : {}
        const signcolor = this.props.location.pathname === '/signin' ? { backgroundColor: "green", color: "white" } : {}
        const namecolor= this.props.location.pathname === '/editprofile'||this.props.location.pathname==="/orders"||this.props.location.pathname==="/wallet"||this.props.location.pathname==="/changepsw" ? { backgroundColor: "green", color: "white",textDecoration: "none", left: "1050px", color: "white", height: "51px" } : {textDecoration: "none", left: "1050px", color: "white", height: "51px"}
        return (
            <div>{this.state.dropdown ? <div className={classes.Backdrop} onClick={() => this.setState({ dropdown: false })}></div> : null}

                <div className={classes.container}>
                    <Link to="/" ><img src={Logo} className={classes.logo} alt="logo" /> </Link>
                    <Link to="/" className={classes.brandname}><h3 >Kabadimart</h3></Link>
                    <Link to="/" className={classes.home} style={homecolor}><h4 >Home</h4></Link>
                    <Link to="/scraprate" className={classes.scrap} style={scrapratecolor}><h4 >Garbage-Rate</h4></Link>
                    <Link to="/pickuprquest" className={classes.pickup} style={pickupcolor}><h4 >Pickup-Request</h4></Link>
                    {!this.props.isAuthorized ? <Link to="/signin" className={classes.auth} style={signcolor}><h4>SignUp|SignIn</h4></Link> : <div onClick={(e) => this.hidedropdown(e)} style={namecolor} className={classes.auth}><h4 style={{textAlign: "center"}}>{this.props.user.name}</h4></div>}
                </div>
                {this.state.dropdown ? <div className={classes.container1}>
                    <div onClick={() => this.setState({ dropdown: false })}><Link to='/editprofile' style={{ textDecoration: "none" }}><h5><span className={classes.option} style={{ marginBottom: "10px" }}>Edit Profile</span></h5></Link></div>
                    <div onClick={() => this.setState({ dropdown: false })}><Link to='/orders' style={{ textDecoration: "none" }}><h5><span className={classes.option}>My Orders</span></h5></Link></div><br />
                    <div onClick={() => this.setState({ dropdown: false })}><Link to='/wallet' style={{ textDecoration: "none" }}><h5><span className={classes.option}>My Wallet</span></h5></Link></div><br />
                    <div onClick={() => this.setState({ dropdown: false })}><Link to='/changepsw' style={{ textDecoration: "none" }}><h5><span className={classes.option}>Change Password</span></h5></Link></div><br />
                    <h5><span className={classes.option} onClick={(e) => this.onlogout(e)}>Logout</span></h5><br />
                </div> : null}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.User.token !== null,
        user: state.User.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserById: () => dispatch(actions.getUserById()),
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

