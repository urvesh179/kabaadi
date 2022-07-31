import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as actions from '../../redux-store/Actions/authAction'
import classes from './BankInfo.css'

class BankInfo extends Component {
    state = {
        bankName: "",
        name: "",
        ifsc: "",
        accNumber: "",
        confirmAcc: "",
        error: {}
    }

    validate = () => {
        let bankName = this.state.bankName
        let name = this.state.name
        let ifsc = this.state.ifsc
        let accNumber = this.state.accNumber
        let confirmAcc = this.state.confirmAcc
        let error = {}
        let isValid = true
        if (name === '') {
            isValid = false
            error.name = "Name must be required"
        }
        if (bankName === '') {
            isValid = false
            error.bankName = "Bank name must be required"
        }
        if (ifsc === '') {
            isValid = false
            error.ifsc = 'IFSC code must be required'
        } else if (ifsc.toString().length < 11 || ifsc.toString().length > 11) {
            isValid = false
            error.ifsc = "IFSC Code must be equal 11 alpha-numeric"
        }
        if (accNumber === '') {
            isValid = false
            error.accNumber = "account number must be required"
        }
        if (confirmAcc !== accNumber) {
            isValid = false
            error.confirmAcc = "account number does not match"
        }
        this.setState({ error })

        return isValid
    }

    oncancel = (e) => {
        e.preventDefault()

        this.props.history.goBack()
    }

    onsubmit = async(e) => {
        e.preventDefault()
        const isValid = this.validate()

        if (isValid) {
            await this.props.reedommoney(this.props.match.params.amount)
            this.props.history.push('/')
        }
    }

    render() {
        const BankInfo = (
            <div className={classes.main}>
                <h1 className={classes.title}>Bank Details</h1>
                <div className={classes.container}>
                    <label><b>Account Holder Name</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.name ? this.state.error.name : null}</span>
                    <input type="text" placeholder="Enter Account Holder name" required onChange={(e) => this.setState({ name: e.target.value, error: {} })} className={classes.Input} /><br />

                    <label><b>Bank Name</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.bankName ? this.state.error.bankName : null}</span>
                    <input type="text" placeholder="Enter Bank name" required onChange={(e) => this.setState({ bankName: e.target.value, error: {} })} className={classes.Input} /><br />

                    <label><b>IFSC Code</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.ifsc ? this.state.error.ifsc : null}</span>
                    <input type="text" placeholder="Enter IFSC Code" required onChange={(e) => this.setState({ ifsc: e.target.value, error: {} })} className={classes.Input} /><br />

                    <label><b>Account Number</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.accNumber ? this.state.error.accNumber : null}</span>
                    <input type="number" placeholder="Enter Account Number" required onChange={(e) => this.setState({ accNumber: e.target.value, error: {} })} className={classes.Input} /><br />

                    <label><b>Confirm Account Number</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.confirmAcc ? this.state.error.confirmAcc : null}</span>
                    <input type="number" placeholder="Confirm Account Number" required onChange={(e) => this.setState({ confirmAcc: e.target.value, error: {} })} className={classes.Input} /><br />

                    <button className={classes.btncancel} onClick={(e) => this.oncancel(e)}>Cancel</button>
                    <button className={classes.btnsuccess} onClick={(e) => this.onsubmit(e)}>Submit</button>
                </div>
            </div>
        )
        return (
            <div>
                {BankInfo}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reedommoney:(money)=>dispatch(actions.reedommoney(money))
    }
}
export default connect(null,mapDispatchToProps)(withRouter(BankInfo))