import React, { Component } from 'react'
import isemail from 'validator/lib/isEmail'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import classes from './Forgotpsw.css'
import { Link } from 'react-router-dom'
import * as actions from '../../redux-store/Actions/authAction'

class Forgotpsw extends Component {
    state = {
        email: '',
        error: ''
    }


    onConfirm = async (e) => {
        e.preventDefault()
        let error = ''
        if (!isemail(this.state.email)) {
            error = 'Enter valid email'
            this.setState({ error: error })
        } else {
            await this.props.checkuser(this.state.email)
            if (this.props.message === '') {
                const id = this.state.email
                this.props.history.push('/passwordrec/' + id)
            }
        }
    }

    render() {
        const forgot = (
            <div className={classes.container}>
                <form>
                    <div className={classes.container}>
                        <h1>Forgot Password</h1>
                        <hr />
                        <label for="email" className={classes.label}><b>Email</b></label><label style={{ color: "red", marginLeft: "20px" }}>{this.state.error ? this.state.error : null}</label>
                        <input type="text" placeholder="Enter Email" name="email" required onChange={(e) => this.setState({ email: e.target.value })} autoComplete="off" />
                        <br />
                        <label style={{ color: "red" }}>{this.props.message ? 'User not Found With this email' : null}</label>
                        <br />
                        <div className={classes.clearfix}>
                            <Link to='/'><button type="button" className={classes.cancelbtn}>Cancel</button></Link>
                            <button type="submit" className={classes.signupbtn} onClick={(e) => this.onConfirm(e)}>Confirm</button>
                        </div>
                    </div>
                </form>
            </div>

        )
        return (
            <div>
                {forgot}
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
        checkuser: (email) => dispatch(actions.checkuser(email))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Forgotpsw))