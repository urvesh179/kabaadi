import React, { useEffect, useState, useMemo } from 'react'
import { connect,useSelector } from 'react-redux'
import { format } from 'date-fns'
import Pagination from 'react-js-pagination'

import * as actions from '../../redux-store/Actions/garbagecollactions'
import classes from './ComOrders.css'

const ComOrders = (props) => {

    const comOrder = useSelector(state => state.GC.completedOrder)

    const [state, setstate] = useState({
        activePage: 1,
        currentRowData: [],
        itemLength: 0,
    })

    useEffect(() => {
        async function fetchorder() {
            await props.getcompletedorder()
        }
        fetchorder()
    }, [])

    useMemo(() => {
        let totalItemsCount = props.completedOrder.length;
        let currentRowData = props.completedOrder.slice(0, 10);
        setstate({
            ...state,
            currentRowData,
            itemLength: totalItemsCount,
        })
    }, [comOrder])

    const handlePageChange = (pageNumber) => {
        let upperLimit = parseInt(pageNumber) * 10;
        let lowerLimit = upperLimit - 10;
        let data = [];
        if (upperLimit <= state.itemLength) {
            data = comOrder.slice(lowerLimit, upperLimit);
        } else {
            data = comOrder.slice(lowerLimit);
        }
        setstate({
            ...state,
            currentRowData: data,
            activePage: pageNumber
        })
    }

    return (
        <div className={classes.container}>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Completed orders</h2>
            {props.completedOrder?.length===0?<h4 style={{textAlign:'center'}}>You Have Not Completed Any Order...</h4>:
            <div>
            <table width="100%">
                <tr>
                    <th>Order Id</th>
                    <th>Date</th>
                    <th>TotalWeight</th>
                    <th>TotalAmount</th>
                </tr>
                {state.currentRowData?.map(order => {
                    return (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>{order.orderId.substr(order.orderId.length - 7)}</td>
                            <td>{format(new Date(order.createdAt), "dd-MM-yyyy")}</td>
                            <td>{order.totalWeight} Kg</td>
                            <td>&#x20B9; {order.totalAmount}</td>
                        </tr>
                    )
                })}
            </table>
            <div className={classes.pagination}>
                <Pagination
                    activePage={state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={state.itemLength}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                />
            </div>
            </div>}
        </div>
    )
}

const mapStateToPorps = state => {
    return {
        completedOrder: state.GC.completedOrder.reverse()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getcompletedorder: () => dispatch(actions.getcompletedorder())
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(ComOrders)