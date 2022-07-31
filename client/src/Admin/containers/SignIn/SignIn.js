import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import isemail from 'validator/lib/isEmail'

import classes from './SignIn.css'

const SignIn = (props) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [validemail] = useState(process.env.REACT_APP_EMAIL)
    const [validpsw] = useState(process.env.REACT_APP_PASSWORD)
    const [errors, seterrors] = useState({})
    const [errorclass] = useState([classes.name])
    const history = useHistory()

    const validate = () => {
        let isValid = true
        let error = {}
        if (email === "") {
            isValid = false
            error.email = "email must be required"
        } else if (!isemail(email) || email !== validemail) {
            isValid = false
            error.email = "Enter valid email"
        }
        if (password === "" || password.toString().length < 8 || password !== validpsw) {
            isValid = false
            error.password = "Enter valid password"
        }
        seterrors(error)

        return {
            error,
            isValid
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const { error, isValid } = validate()
        if (!isValid) {
            if (error.email) {
                errorclass.push(classes.nameerror)
            }
            if (error.password) {
                errorclass.push(classes.nameerror)
            }
        } else {
            await localStorage.setItem('admin', "kabadimart")
            history.push({ pathname: '/admin/dashboard' })
        }
    }
    return (
        <div>
            <div className={classes.container1}>
                <h1 style={{ marginBottom: "20px", color: "green" }}>Admin Login</h1>
                <form style={{ border: "1px solid #ccc" }}>
                    <div className={classes.container}>
                        <h1>Sign In</h1>
                        <p>Please fill in this form to Login an account.</p>
                        <hr />

                        <label for="email"><b>Email</b><span className={errorclass.join(" ")}>{errors.email ? errors.email : null}</span></label>
                        <input type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            autoComplete="off" required />


                        <label for="psw"><b>Password</b><span className={errorclass.join(" ")}>{errors.password ? errors.password : null}</span></label>
                        <input type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)} required />

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

export default SignIn