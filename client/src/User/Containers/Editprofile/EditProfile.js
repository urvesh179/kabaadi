import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import classes from './Editprofile.css'
import * as actions from '../../redux-store/Actions/authAction'
import * as adminActions from '../../../Admin/redux-store/actions/gcactions'

class Editprofile extends Component {

    state = {
        name: this.props.user.name,
        mobile: this.props.user.mobile,
        city: this.props.user.city,
        errors: {},
        valid: false,
        errorclass: [classes.name],

    }

    componentDidMount = async () => {
        await this.props.getUserById()
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
        let mobile = this.state.mobile
        let city = this.state.city
        let isvalid = true
        let error = {}
        if (name === "") {
            isvalid = false
            error.name = "name must be required"
        }
        if (city === "select-city" || city === "") {
            isvalid = false
            error.city = "please select city"

        }
        if (mobile.toString().length < 10 || mobile.toString().length > 10) {
            isvalid = false
            error.mobile = "mobile number must be equal 10 digit"
        }

        this.setState({ errors: error })

        return {
            error,
            isvalid
        }

    }

    edithandler = async (e) => {
        e.preventDefault()
        const { error, isvalid } = this.validate()

        if (!isvalid) {
            if (error.name) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.mobile) {
                this.state.errorclass.push(classes.nameerror)
            }
            if (error.city) {
                this.state.errorclass.push(classes.nameerror)
            }
        }
        else {
            const user = {
                name: this.state.name,
                mobile: this.state.mobile,
                city: this.state.city,
                email: this.props.user.email
            }
            await this.props.editprofile(user)
            this.props.history.push("/")
        }
    }


    render() {
        const editprofile = (
            <div className={classes.container1}>
                <form style={{ border: "1px solid #ccc" }}>
                    <div className={classes.container}>
                        <h1>Edit Profile</h1>
                        <p>Please fill in this form to edit your Profile.</p>
                        <hr />
                        <label for="name"><b>Name</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.name ? this.state.errors.name : null}</span></label>
                        <input type="text" placeholder="Enter First Name" name="name" value={this.state.name} onChange={(e) => this.onChange(e)} required autoComplete="off" />

                        <label for="email"><b>Email</b></label>
                        <input type="text" name="email" value={this.props.user.email} disabled />

                        <label for="mobile"><b>Mobile Number</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.mobile ? this.state.errors.mobile : null}</span></label>
                        <input type="number" placeholder="Enter Mobile number" name="mobile" value={this.state.mobile} onChange={(e) => this.onChange(e)} required />

                        <label for="city"><b>Choose city</b><span className={this.state.errorclass.join(" ")}>{this.state.errors.city ? this.state.errors.city : null}</span></label>
                        <select name="city" id="city" className={classes.city} value={this.state.city} onChange={(e) => this.onChange(e)}>
                            <option value="select-city" >select-city</option>
                            {this.props.gcs.map(gc => {
                                return (
                                    <option value={gc.city} onChange={(e) => this.onChange(e)} key={gc.city}>{gc.city}</option>
                                )
                            })}
                        </select>

                        <div class={classes.clearfix}>
                            <Link to='/'><button type="button" class={classes.cancelbtn} >Cancel</button></Link>
                            <button type="submit" class={classes.signupbtn} onClick={(e) => this.edithandler(e)}>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        )
        return (
            <div>
                {editprofile}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.User.user,
        gcs: state.Admin.gcs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editprofile: (user) => dispatch(actions.editprofile(user)),
        getUserById: () => dispatch(actions.getUserById()),
        getgc: () => dispatch(adminActions.getgc())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editprofile))