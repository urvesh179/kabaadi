import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../redux-store/Actions/authAction'
import classes from './Passwordrec.css'

class Passwordrec extends Component {
    state = {
        otp: '',
        error: "",
        passwordbox: false,
        password: "",
        pswerror: ""
    }

    onSubmit = async (e) => {


        e.preventDefault()
        let er = ""
        if (this.state.otp === "") {
            er = "enter otp"
            this.setState({ error: er })
        } else {
            await this.props.checkotp(this.state.otp)
            if (this.props.message === "") {
                this.setState({ passwordbox: true })
            }
        }

    }
    onpswSubmit = async (e) => {
        e.preventDefault()
        let er = ''
        if (this.state.password === "" || this.state.password.toString().length < 8) {
            er = "Password must be at least 8 character long"
            this.setState({ pswerror: er })
        } else {
            this.props.updatepassword(this.state.password, this.props.match.params.id)
            this.props.history.push('/signin')
        }
    }
    render() {
        return (
            <div>
                <div className={classes.container}>
                    {!this.state.passwordbox ? <div>
                        <label style={{ fontWeight: "bold", fontSize: "25px" }}>Enter OTP</label><h5 style={{ color: "red", marginLeft: "30px" }}>{this.state.error ? this.state.error : null}</h5><br />
                        <label style={{ fontSize: "15px" }}>We have sent otp in your email</label>
                        <input type="number" placeholder="Enter Otp" required onChange={(e) => this.setState({ otp: e.target.value })} /><br />
                        <h5 style={{ color: "red" }}>{this.props.message ? this.props.message : null}</h5>
                        <button onClick={(e) => this.onSubmit(e)}>Submit</button>
                    </div> : null}

                    {this.state.passwordbox ? <div>
                        <label style={{ fontWeight: "bold", fontSize: "25px" }}>Enter New Password</label><h5 style={{ color: "red", marginLeft: "30px" }}>{this.state.pswerror ? this.state.pswerror : null}</h5><br />
                        <input type="password" placeholder="Enter new password" required onChange={(e) => this.setState({ password: e.target.value })} /><br />
                        <button onClick={(e) => this.onpswSubmit(e)}>Submit</button>
                    </div> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.User.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkotp: (otp) => dispatch(actions.checkotp(otp)),
        updatepassword: (password, email) => dispatch(actions.updatepassword(password, email))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Passwordrec))