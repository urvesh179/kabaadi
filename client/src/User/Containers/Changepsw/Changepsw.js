import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Changepsw.css'
import * as actions from '../../redux-store/Actions/authAction'

class Changepsw extends Component {
    state = {
        oldpsw: "",
        newpsw: "",
        error: {},
        berror:''
    }

    validate = () => {
        let isValid = true
        let error = {}
        if (this.state.oldpsw === "" || this.state.oldpsw.toString().length < 8) {
            isValid = false
            error.oldpsw = "Password must be 8 character long"
        }
        if (this.state.newpsw === "" || this.state.newpsw.toString().length < 8) {
            isValid = false
            error.newpsw = "Password must be 8 character long"
        }

        this.setState({ error })

        return isValid
    }

    onSubmitHandler = async (e) => {
        e.preventDefault()
        const isValid = this.validate()
        if (isValid) {
            const pass = {
                oldpsw: this.state.oldpsw,
                newpsw: this.state.newpsw
            }
            await this.props.changepassword(pass)
            if(this.props.message !== ''){
                this.setState({berror:this.props.message})
            }
            if (this.props.message === '') {
                this.props.history.push('/')
            }
        }
    }

    oncancel=(e)=>{
        e.preventDefault()
        this.setState({berror:""})
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className={classes.container}>
                    <label style={{ fontWeight: "bold", fontSize: "25px",marginTop:"25px",marginBottom:"-15px" }}>Enter old Password</label><h5 style={{ color: "red", margin: "8px 0 -5px 0", fontSize: "15px" }}>{this.state.error.oldpsw ? this.state.error.oldpsw : null}</h5><br />
                    <input type="password" style={{marginTop:"-35px",marginBottom:"30px"}} placeholder="Enter old password" required onChange={(e) => this.setState({ oldpsw: e.target.value })} /><br />

                    <label style={{ fontWeight: "bold", fontSize: "25px",marginBottom:"-15px" }}>Enter New Password</label><h5 style={{ color: "red", margin: "8px 0 -5px 0", fontSize: "15px" }}>{this.state.error.newpsw ? this.state.error.newpsw : null}</h5><br />
                    <input type="password" style={{marginTop:"-35px"}} placeholder="Enter new password" required onChange={(e) => this.setState({ newpsw: e.target.value })} /><br />

                    <span style={{ margin: "15px 0", color: "red" }}>{this.state.berror ? this.state.berror : null}</span>
                    <div class={classes.clearfix}>
                        <button type="button" class={classes.cancelbtn} onClick={(e)=>this.oncancel(e)}>Cancel</button>
                        <button type="submit"
                            class={classes.signupbtn}
                            onClick={(e) => this.onSubmitHandler(e)} >Submit</button>
                    </div>
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
        changepassword: (pass) => dispatch(actions.changepassword(pass))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Changepsw))