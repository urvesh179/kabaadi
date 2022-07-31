import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import isemail from 'validator/lib/isEmail'
import { connect } from 'react-redux'

import classes from './SignIn.css'
import * as actions from '../../redux-store/Actions/garbagecollactions'

const SignIn = (props) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errors, seterrors] = useState({})
    const history = useHistory()

    const validate = () => {
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
        seterrors(error)

        return isValid

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (isValid) {
            const gc = {
                email,
                password
            }
            try {
                await props.gclogin(gc)
                history.push({ pathname: '/gc/dashboard' })
            } catch (error) {   
            }
        }
    }

    return (
        <div>
            <div className={classes.container1}>
                <h1 style={{ marginBottom: "30px", color: "green" }}>Garbage Collector Login</h1>
                <form style={{ border: "1px solid #ccc" }}>
                    <div className={classes.container}>
                        <h1>Sign In</h1>
                        <p>Please fill in this form to Login an account.</p>
                        <hr />

                        <label for="email"><b>Email</b></label><span style={{ color: "red", marginLeft: "20px" }}>{errors.email ? errors.email : null}</span>
                        <input type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            autoComplete="off" required />


                        <label for="psw"><b>Password</b></label><span style={{ color: "red", marginLeft: "20px" }}>{errors.password ? errors.password : null}</span>
                        <input type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)} required />

                        <span style={{ margin: "15px 5px", color: "red" }}>{props.error ? props.error : null}</span>
                        <div class={classes.clearfix}>
                            <Link to="/"><button type="button" class={classes.cancelbtn} >Cancel</button></Link>
                            <button type="submit"
                                class={classes.signupbtn}
                                onClick={(e) => onSubmitHandler(e)} >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.GC.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        gclogin: (gc) => dispatch(actions.gclogin(gc))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)