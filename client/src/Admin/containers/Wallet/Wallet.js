import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import Pagination from 'react-js-pagination'

import walletimg from '../../../images/wallet.png'
import classes from './Wallet.css'
import * as actions from '../../redux-store/actions/gcactions'

class Wallet extends Component {
    state = {
        redeem: false,
        inputamount: null,
        activePage: 1,
        currentRowData: [],
        itemLength: 0,
        error: ''
    }

    componentDidMount = async () => {
        await this.props.getadminwallet()
        await this.props.getTransaction()
        let totalItemsCount = this.props.adminTransaction.length;
        let currentRowData = this.props.adminTransaction.slice(0, 5);
        this.setState({
            currentRowData,
            itemLength: totalItemsCount,
        })
    }

    onredeem = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ redeem: !prevstate.redeem }))
    }

    onsubmit = async (e) => {
        e.preventDefault()
        await this.props.addadminwallet(this.state.inputamount)
        this.setState({ redeem: false })
        await this.props.getadminwallet()
        await this.props.getTransaction()
        this.setState({ currentRowData: this.props.adminTransaction.slice(0, 5) })
    }

    oncancel = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ redeem: !prevstate.redeem, error: '' }))
    }

    handlePageChange = (pageNumber) => {
        let upperLimit = parseInt(pageNumber) * 5;
        let lowerLimit = upperLimit - 5;
        let data = [];
        if (upperLimit <= this.state.itemLength) {
            data = this.props.adminTransaction.slice(lowerLimit, upperLimit);
        } else {
            data = this.props.adminTransaction.slice(lowerLimit);
        }
        this.setState({
            currentRowData: data,
            activePage: pageNumber
        })
    }

    render() {
        const wallet = (
            <div className={classes.container}>
                <h1 className={classes.title}>Wallet</h1>
                <div className={classes.amount}>
                    <img src={walletimg} className={classes.walletimg} alt="walletimg"/><h1>&#x20B9; {this.props.adminWallet}</h1>
                    {!this.state.redeem ? <button className={classes.redeembtn} onClick={(e) => this.onredeem(e)}>Add Money</button> : null}<br />
                </div>
                {this.state.redeem ?
                    <div className={classes.redeemamt}>
                        <label><b>Enter Amount</b></label>
                        <input type="number" placeholder="Enter Amount" required onChange={(e) => this.setState({ inputamount: e.target.value })} className={classes.amountInput} /><br />
                        <button className={classes.btncancel} onClick={(e) => this.oncancel(e)}>Cancel</button>
                        <button className={classes.btnsuccess} onClick={(e) => this.onsubmit(e)}>Add</button>
                    </div>
                    : null
                }
                
                <div className={classes.transaction}>
                    {this.props.adminTransaction.length===0?<h4 style={{textAlign:'center'}}>You Have Not Made Any Transaction Till Now..</h4>:
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
                                    <td style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>TransactionId :</span> {transaction._id}<br />{format(new Date(transaction.createdAt), "dd-MM-yyyy   hh:mm:ss a")}<br /><span style={{ fontWeight: "bold" }}>From :</span> {transaction.sender} &nbsp; &nbsp; <span style={{ fontWeight: "bold" }}>To :</span> {transaction.receiver} Garbage Collector</td>
                                    <td style={{ color: "red" }}>{transaction.withdraw ? <span>&#x20B9; {transaction.withdraw}</span> : "-"}</td>
                                    <td style={{ color: "green" }}>{transaction.deposit ? <span>&#x20B9; {transaction.deposit}</span> : "-"}</td>
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
        adminWallet: state.Admin.adminWalletAmount,
        adminTransaction: state.Admin.adminTransaction.reverse()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getadminwallet: () => dispatch(actions.getadminwallet()),
        getTransaction: () => dispatch(actions.getTransaction()),
        addadminwallet: (amount) => dispatch(actions.addadminwallet(amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wallet))