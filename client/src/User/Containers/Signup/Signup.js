import React, { Component } from 'react'
import { connect } from 'react-redux'
import isemail from 'validator/lib/isEmail'

import * as actions from '../../redux-store/Actions/authAction'
import * as adminActions from '../../../Admin/redux-store/actions/gcactions'
import { Link, withRouter } from "react-router-dom"


import classes from './Signup.css'

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        mobile: "",
        city: "",
        password: "",
        citylist: ["surat", "rajkot", "ahmedabad", "vadodara"],
        errors: {},
        valid: false,
        errorclass: [classes.name],
        berror:""
    }

    componentDidMount = async () => {
        await this.props.getgc()
    }

    onChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        })


    }

    validate = () => {
        let name = this.state.name
        let email = this.state.email
        let mobile = this.state.mobile
        let city = this.state.city
        let password = this.state.password
        let isvalid = true
        let error = {}
        if (name === "") {
            isvalid = false
            error.name = "name must be required"
        }
        if (email === "") {
            isvalid = false
            error.email = "email must be required"
        } else if (!isemail(email)) {
            isvalid = false
            error.email = "enter valid email"
        }
        if (mobile.toString().length < 10 || mobile.toString().length > 10) {
            isvalid = false
            error.mobile = "mobile number must be equal 10 digit"
        }
        if (city === "select-city" || city === "") {
            isvalid = false
            error.city = "please select city"

        }
        if (password === "" || password.toString().length < 8) {
            isvalid = false
            error.password = "enter valid passwprd"
        }

        this.setState({ errors: error })

        return {
            error,
            isvalid
        }

    }


    async signuphandler(e) {

        e.preventDefault()
        const { error } = this.validate()
        if (Object.keys(error).length !== 0) {
            if (error.name) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.email) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.mobile) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.city) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.password) {
                this.state.errorclass.push(classes.nameerror)
            }
        } else {
            const user = {
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                city: this.state.city,
                password: this.state.password
            }
            await this.props.signup(user)
            if (this.props.error !== ""){
                this.setState({berror:this.props.error})
            }

            this.setState({errors:{}})
            if (this.props.error === "") {
                this.props.history.push("/")
                await this.props.getUserById()
            }

        }

    }

    oncancel=(e)=>{
        e.preventDefault()
        this.setState({errors:{},berror:""})
        this.props.history.push("/")

    }


    render() {
        const signup = (
            <div className={classes.container1}>
                <form style={{ border: "1px solid #ccc" }}>
                    <div className={classes.container}>
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        <label for="name"><b>Name</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.name ? this.state.errors.name : null}</span></label>
                        <input type="text" placeholder="Enter First Name" name="name" value={this.state.name} onChange={(e) => this.onChange(e)} required autoComplete="off" />

                        <label for="email"><b>Email</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.email ? this.state.errors.email : null}<span style={{ marginLeft: "30px", color: "red" }}>{this.state.berror ? "Email already registered" : null}</span></span></label>
                        <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={(e) => this.onChange(e)} required autoComplete="off" />

                        <label for="mobile"><b>Mobile Number</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.mobile ? this.state.errors.mobile : null}</span></label>
                        <input type="number" placeholder="Enter Mobile number" name="mobile" value={this.state.mobile} onChange={(e) => this.onChange(e)} required />

                        <label for="city"><b>Choose city</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.city ? this.state.errors.city : null}</span></label>
                        <select name="city" id="city" className={classes.city} value={this.state.city} onChange={(e) => this.onChange(e)}>
                            <option value="select-city" >select-city</option>
                            {this.props.gcs.map(gc => {
                                return (
                                    <option value={gc.city} onChange={(e) => this.onChange(e)} key={gc._id}>{gc.city}</option>
                                )
                            })}
                        </select>

                        <label for="password"><b>Password</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.password ? this.state.errors.password : null}</span></label>
                        <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={(e) => this.onChange(e)} required />


                        <div class={classes.clearfix}>
                            <button type="button" class={classes.cancelbtn} onClick={(e)=>this.oncancel(e)}>Cancel</button>
                            <button type="submit" class={classes.signupbtn} onClick={(e) => this.signuphandler(e)}>Sign Up</button>
                        </div>

                        <label>Already have an account?</label>
                        <Link to="/signin" style={{ textDecoration: "none" }}> Signin</Link>
                    </div>
                </form>
            </div>
        )
        return (
            <div>
                {signup}
            </div>

        )
    }
}

const mapstatetoprops = (state) => {
    return {
        error: state.User.error,
        gcs: state.Admin.gcs
    }
}

const mapdispatchtoprops = (dispatch) => {
    return {
        signup: (CurrentUser) => dispatch(actions.Signup(CurrentUser)),
        getUserById: () => dispatch(actions.getUserById()),
        getgc: () => dispatch(adminActions.getgc())
    }
}

export default withRouter(connect(mapstatetoprops, mapdispatchtoprops)(SignUp))