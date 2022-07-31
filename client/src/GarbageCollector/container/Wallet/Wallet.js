import React, { Component } from 'react'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import Pagination from 'react-js-pagination'

import classes from './Wallet.css'
import walletimg from '../../../images/wallet.png'
import * as actions from '../../redux-store/Actions/garbagecollactions'

class Wallet extends Component {
    state = {
        activePage: 1,
        currentRowData: [],
        itemLength: 0,
    }

    componentDidMount = async () => {
        await this.props.getGCById()
        await this.props.getgcTransaction()
        let totalItemsCount = this.props.gcTransaction.length;
        let currentRowData = this.props.gcTransaction.slice(0, 5);
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
            data = this.props.gcTransaction.slice(lowerLimit, upperLimit);
        } else {
            data = this.props.gcTransaction.slice(lowerLimit);
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
                    <img src={walletimg} className={classes.walletimg} alt="walletimg" /><h1>&#x20B9; {this.props.gc.walletAmount}</h1>
                </div>
                <div className={classes.transaction}>
                    {this.props.gcTransaction.length===0?<h4 style={{textAlign:'center'}}>You Have Not Made Any Transaction Till Now..</h4>:
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
                    </div>
                    </div>}
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
const mapStateToProps = state => {
    return {
        gc: state.GC.gc,
        gcTransaction: state.GC.gcTransaction.reverse()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGCById: () => dispatch(actions.getGCById()),
        getgcTransaction: () => dispatch(actions.getgcTransaction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)