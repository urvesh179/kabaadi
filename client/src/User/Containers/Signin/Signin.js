import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import isemail from 'validator/lib/isEmail'
import { connect } from 'react-redux'

import classes from './Signin.css'
import * as actions from '../../redux-store/Actions/authAction'

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        errors: {},
        berror:"",
        errorclass: [classes.name]
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    validate = () => {
        let email = this.state.email
        let password = this.state.password
        let isValid = true
        let error = {}
        if (email === "") {
            isValid = false
            error.email = "email must be required"
        } else if (!isemail(email)) {
            isValid = false
            error.email = "Enter valid email"
        }
        if (password === "" || password.toString().length < 8) {
            isValid = false
            error.password = "Enter valid password"
        }

        this.setState({ errors: error })

        return {
            error,
            isValid
        }
    }

    onSubmitHandler = async (e) => {
        e.preventDefault()
        const { error, isValid } = this.validate()
        if (!isValid) {
            if (error.email) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.password) {
                this.state.errorclass.push(classes.nameerror)
            }
        }
        else {
            const user = {
                email: this.state.email,
                password: this.state.password,
            };

            await this.props.login(user);
            if (this.props.error !== ""){
                this.setState({berror:this.props.error})
            }
            this.setState({ password: "" })

            if (this.props.error === "") {
                await this.props.getUserById()
                this.props.history.push("/")
            }

        }
    }

    oncancel=(e)=>{
        this.setState({berror:"",errors:{}})
        this.props.history.push("/")
    }
    
    render() {
        const signin = (
            <div className={classes.container1}>
                <form style={{ border: "1px solid #ccc" }}>
                    <div className={classes.container}>
                        <h1>Sign In</h1>
                        <p>Please fill in this form to Login an account.</p>
                        <hr />

                        <label for="email"><b>Email</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.email ? this.state.errors.email : null}</span></label>
                        <input type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.changeHandler(e)}
                            autoComplete="off" required />


                        <label for="psw"><b>Password</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.password ? this.state.errors.password : null}</span></label>
                        <input type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={this.state.password}
                            onChange={(e) => this.changeHandler(e)} required />

                        <span style={{ margin: "15px 0", color: "red" }}>{this.props.error ? this.state.berror : null}</span>
                        <div class={classes.clearfix}>
                            <button type="button" class={classes.cancelbtn} onClick={(e)=>this.oncancel(e)}>Cancel</button>
                            <button type="submit"
                                class={classes.signupbtn}
                                onClick={(e) => this.onSubmitHandler(e)} >Login</button>
                        </div>

                        <Link to='/forgot' ><label style={{ cursor: "pointer" }}>Forgot Password</label></Link><br />

                        <label>If You Don't Have An Account ?</label>
                        <Link to="/signup" style={{ textDecoration: "none" }}> Signup</Link>
                    </div>
                </form>
            </div>
        )
        return (
            <div>
                {signin}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.User.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(actions.Signin(user)),
        getUserById: () => dispatch(actions.getUserById())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn))