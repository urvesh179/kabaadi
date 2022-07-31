import React, { useEffect, useMemo, useState } from 'react'
import classes from './Dashboard.css'
import { CanvasJSChart } from 'canvasjs-react-charts'
import { connect, useSelector } from 'react-redux'
import { format } from 'date-fns'
import Pagination from 'react-js-pagination'

import spendmoney from '../../../images/spendmoney.png'
import totalusers from '../../../images/totalusers.jpg'
import cart from '../../../images/cart.jpg'
import garbage from '../../../images/garbage.png'
import * as actions from '../../redux-store/actions/gcactions'

const Dashboard = (props) => {

    const ord = useSelector(state => state.Admin.orders)

    const [state, setstate] = useState({
        city: "allcity",
        activePage: 1,
        currentRowData: [],
        itemLength: 0,
    })

    useEffect(() => {
        async function fetchrecord() {
            await props.getdata()
            await props.getgc()
            await props.getorders('allcity')
            await props.getrecordbycity('allcity')
        }
        fetchrecord()
    }, [])

    useMemo(() => {
        let totalItemsCount = props.orders.length;
        let currentRowData = props.orders.slice(0, 5);
        setstate({
            ...state,
            currentRowData,
            itemLength: totalItemsCount,
        })
    }, [ord])

    const stateChange = async (e) => {
        setstate({ ...state, city: e.target.value })
        await props.getorders(e.target.value)
        await props.getrecordbycity(e.target.value)
    }

    const handlePageChange = (pageNumber) => {
        let upperLimit = parseInt(pageNumber) * 5;
        let lowerLimit = upperLimit - 5;
        let data = [];
        if (upperLimit <= state.itemLength) {
            data = ord.slice(lowerLimit, upperLimit);
        } else {
            data = ord.slice(lowerLimit);
        }
        setstate({
            ...state,
            currentRowData: data,
            activePage: pageNumber
        })
    }

    const totalweight = props.Paper.paperweight + props.Plastic.plasticweight + props.Metal.metalweight + props.Ewaste.ewasteweight + props.Other.otherweight
    const totalamount = props.Paper.paperspend + props.Plastic.plasticspend + props.Metal.metalspend + props.Ewaste.ewastespend + props.Other.otherspend
    const paperper = (props.Paper.paperweight / totalweight) * 100
    const plasticper = (props.Plastic.plasticweight / totalweight) * 100
    const metalper = (props.Metal.metalweight / totalweight) * 100
    const ewasteper = (props.Ewaste.ewasteweight / totalweight) * 100
    const otherper = (props.Other.otherweight / totalweight) * 100

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Garbage Details"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: paperper.toFixed(2), label: "Paper" },
                { y: plasticper.toFixed(2), label: "Plastic" },
                { y: metalper.toFixed(2), label: "Metal" },
                { y: ewasteper.toFixed(2), label: "E-Waste" },
                { y: otherper.toFixed(2), label: "Other" }
            ]
        }]
    }
    let card = (
        <div className={classes.cards}>
            <div className={classes.card}>
                <img src={spendmoney} className={classes.img} alt="spendmoney" />
                <span className={classes.amount}>&#x20B9; {props.totalSpend}</span><br />
                <span className={classes.title}>Total Spend</span>
            </div>
            <div className={classes.card}>
                <img src={cart} className={classes.img} alt="cart" />
                <span className={classes.amount}>{props.totalOrder}</span><br />
                <span className={classes.title}>Total Orders</span>
            </div>
            <div className={classes.card}>
                <img src={garbage} className={classes.img} alt="garbage" />
                <span className={classes.amount}>KG {props.totalGarbageWeight}</span><br />
                <span className={classes.title}>Total Garbage</span>
            </div>
            <div className={classes.card}>
                <img src={totalusers} className={classes.img} alt="totalusers" />
                <span className={classes.amount}>{props.totalUser}</span><br />
                <span className={classes.title}>Total Users</span>
            </div>
        </div>
    )

    let dropdown = (
        <div className={classes.dropdown}>
            <label for="city"><b>Choose city</b></label>
            <select name="city" id="city" className={classes.city} value={state.city} onChange={stateChange}>
                <option value="allcity">All-City</option>
                {props.gcs.map(gc => {
                    return (
                        <option value={gc.city} key={gc.city} >{gc.city}</option>
                    )
                })}
            </select>
        </div>
    )

    let orders = (
        <div className={classes.orders}>
            <table width="80%">
                <tr>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>City</th>
                    <th>Status</th>
                </tr>
                {state.currentRowData.map(order => {
                    return (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>{order._id.substr(order._id.length - 5)}</td>
                            <td>{order.name}</td>
                            <td>{format(new Date(order.createdAt), "dd-MM-yyyy")}</td>
                            <td>{order.city}</td>
                            {order.status === 'pending' ? <td style={{ color: "red" }}>{order.status}</td> : <td style={{ color: "green" }}>{order.status}</td>}
                        </tr>
                    )
                })}
            </table>
            <div className={classes.pagination}>
                <Pagination
                    activePage={state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={state.itemLength}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )

    let graph = (
        <div className={classes.container1}>
            <div className={classes.chartStyle}>
                <CanvasJSChart options={options} />
            </div>
            <div className={classes.graphcard}>
                <table width="100%">
                    <tr>
                        <th>Category</th>
                        <th>Total Garbage</th>
                        <th>Total Spend</th>
                    </tr>
                    <tr>
                        <td><b>Paper</b></td>
                        <td>{props.Paper.paperweight} KG</td>
                        <td>&#x20B9; {props.Paper.paperspend}</td>
                    </tr>
                    <tr>
                        <td><b>Plastic</b></td>
                        <td>{props.Plastic.plasticweight} KG</td>
                        <td>&#x20B9; {props.Plastic.plasticspend}</td>
                    </tr>
                    <tr>
                        <td><b>Metal</b></td>
                        <td>{props.Metal.metalweight} KG</td>
                        <td>&#x20B9; {props.Metal.metalspend}</td>
                    </tr>
                    <tr>
                        <td><b>E-Waste</b></td>
                        <td>{props.Ewaste.ewasteweight} KG</td>
                        <td>&#x20B9; {props.Ewaste.ewastespend}</td>
                    </tr>
                    <tr>
                        <td><b>Other</b></td>
                        <td>{props.Other.otherweight} KG</td>
                        <td>&#x20B9; {props.Other.otherspend}</td>
                    </tr>
                    <tr className={classes.total}>
                        <td><b>Total</b></td>
                        <td>{totalweight} KG</td>
                        <td>&#x20B9; {totalamount}</td>
                    </tr>
                </table>
            </div>
        </div>
    )

    return (
        <div className={classes.container}>
            {card}
            {dropdown}
            {orders}
            {graph}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        gcs: state.Admin.gcs,
        orders: state.Admin.orders.reverse(),
        totalSpend: state.Admin.totalSpend,
        totalGarbageWeight: state.Admin.totalGarbageWeight,
        totalOrder: state.Admin.totalOrder,
        totalUser: state.Admin.totalUser,
        Paper: state.Admin.Paper,
        Plastic: state.Admin.Plastic,
        Metal: state.Admin.Metal,
        Ewaste: state.Admin.Ewaste,
        Other: state.Admin.Other
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getgc: () => dispatch(actions.getgc()),
        getorders: (city) => dispatch(actions.getorders(city)),
        getdata: () => dispatch(actions.getdata()),
        getrecordbycity: (city) => dispatch(actions.getrecordbycity(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)