import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { format } from 'date-fns'
import Pagination from 'react-js-pagination'

import * as actions from '../../redux-store/Actions/authAction'
import walletimg from '../../../images/wallet.png'
import classes from './Wallet.css'

class Wallet extends Component {
    state = {
        redeem: false,
        inputamount: '',
        error: '',
        activePage: 1,
        currentRowData: [],
        itemLength: 0,
    }

    componentDidMount=async()=>{
        await this.props.getUserById()
        await this.props.getUserTransaction()
        let totalItemsCount = this.props.userTransaction.length;
        let currentRowData = this.props.userTransaction.slice(0, 5);
        this.setState({
            currentRowData,
            itemLength: totalItemsCount,
        })
    }

    handlePageChange = (pageNumber) => {
        let upperLimit = parseInt(pageNumber) * 5;
        let lowerLimit = upperLimit - 5;
        let data = [];
        if (upperLimit <= this.state.itemLength) {
            data = this.props.userTransaction.slice(lowerLimit, upperLimit);
        } else {
            data = this.props.userTransaction.slice(lowerLimit);
        }
        this.setState({
            currentRowData: data,
            activePage: pageNumber
        })
    }

    onredeem = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ redeem: !prevstate.redeem }))
    }

    onsubmit = async(e) => {
        e.preventDefault()
        let error = ''
        if (this.state.inputamount <= 100) {
            error = 'Redeem amount must be greater than 100'
        } else if (this.state.inputamount > this.props.user.walletAmount) {
            error = 'insufficient balance'
        } else {
            this.setState(prevstate => ({ redeem: !prevstate.redeem }))
            this.props.history.push('/bankinfo/'+this.state.inputamount)
        }
        this.setState({ error })

    }

    oncancel = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ redeem: !prevstate.redeem, error: '' }))
    }

    render() {
        const wallet = (
            <div className={classes.container}>
                <h1 className={classes.title}>Wallet</h1>
                <div className={classes.amount}>
                    <img src={walletimg} className={classes.walletimg} alt="walletimg"/><h1>&#x20B9; {this.props.user.walletAmount}</h1>
                    {!this.state.redeem ? <button className={classes.redeembtn} onClick={(e) => this.onredeem(e)}>Redeem Amount</button> : null}<br />
                </div>
                {this.state.redeem ?
                    <div className={classes.redeemamt}>
                        <label><b>Enter Amount</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error ? this.state.error : null}</span>
                        <input type="number" placeholder="Enter Amount" required onChange={(e) => this.setState({ inputamount: e.target.value })} className={classes.amountInput} /><br />
                        <button className={classes.btncancel} onClick={(e) => this.oncancel(e)}>Cancel</button>
                        <button className={classes.btnsuccess} onClick={(e) => this.onsubmit(e)}>Redeem</button>
                    </div>
                    : null
                }
                <div className={classes.transaction}>
                    {this.props.userTransaction.length===0?<h4 style={{textAlign:'center'}}>You Have Not Made Any Transaction Till Now..</h4>:
                    <div>
                        <br /><h3 className={classes.heading}>All Transaction Details</h3>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <th>Details</th>
                            <th>Withdraw</th>
                            <th>Deposit</th>
                        </tr>

                        {this.state.currentRowData.map(transaction => {
                            return (
                                <tr key={transaction._id}>
                                    <td style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>TransactionId :</span> {transaction._id}<br />
                                        {format(new Date(transaction.createdAt), "dd-MM-yyyy   hh:mm:ss a")}<br />
                                        <span style={{ fontWeight: "bold" }}>From :</span> {transaction.sender} &nbsp; &nbsp; <span style={{ fontWeight: "bold" }}>To :</span> {transaction.receiver}</td>
                                    <td style={{ color: "red" }}>{transaction.withdraw ? <span>&#x20B9; {parseFloat(transaction.withdraw)}</span> : "-"}</td>
                                    <td style={{ color: "green" }}>{transaction.deposit ? <span>&#x20B9; {parseFloat(transaction.deposit)}</span> : "-"}</td>
                                </tr>
                            )
                        })}
                    </table>
                    <div className={classes.pagination}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={this.state.itemLength}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                        />
                    </div></div>}
                </div>
            </div>
        )
        return (
            <div>
                {wallet}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.User.user,
        userTransaction:state.User.userTransaction.reverse()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserById: () => dispatch(actions.getUserById()),
        getUserTransaction:()=>dispatch(actions.getuserTransaction()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Wallet))