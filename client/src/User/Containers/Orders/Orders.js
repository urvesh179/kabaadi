import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { withRouter } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

import classes from './Orders.css'
import * as actions from '../../redux-store/Actions/orderAction'

class Orders extends Component {

    state = {
        show: true,
        address: "",
        orderid: ""
    }

    componentDidMount = async () => {
        await this.props.getorders()
    }

    oncancel = async (e, id) => {
        e.preventDefault()
        await this.props.cancelorder(id)
        this.componentDidMount()
    }

    onchangeaddress = async (e, id) => {
        e.preventDefault()
        this.setState({ show: false, orderid: id })
    }

    updateaddress = async (e) => {
        e.preventDefault()
        await this.props.updateorderaddress(this.state.orderid, this.state.address)
        this.setState({ show: true, orderid: "", address: "" })
    }

    oninvoice = async (e, order) => {
        e.preventDefault()
        await this.props.getconfirmorder(order._id)
        const orderId = order._id.substr(order._id.length - 8)
        const date = format(new Date(order.createdAt), "dd-MM-yyyy")

        const ord = []
        Object.values(this.props.confirmorder.garbage).map(garbage => {
            const arr = Object.values(garbage).slice(0, Object.values(garbage).length - 1)
            arr.map(elm => {
                ord.push(elm)
            })
        })
        ord.push({})
        ord.push({})
        ord.push({ name: '', Total: 'Total Weight', weight: `${this.props.confirmorder.totalWeight} Kg` })
        ord.push({ name: '', Total: 'Total Amount', amount: `Rs. ${this.props.confirmorder.totalAmount}/-` })
        const value = ord.map(order => Object.values(order))
        const doc = new jsPDF('p', 'pt')
        var imgData = 'data:image/png;base64,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'
        doc.setFontSize(30)
        doc.text("Invoice", 245, 120)
        doc.output('datauri');
        doc.addImage(imgData, 'PNG', 260, 30, 60, 60)
        doc.setFontSize(15)
        doc.text(`OrderId : ${orderId} `, 400, 160)
        doc.setFontSize(15)
        doc.text(`Date : ${date} `, 400, 180)
        doc.setFontSize(15)
        doc.text("Bill To, ", 40, 235)
        doc.setFontSize(12)
        doc.text(`${order.name}`, 40, 255)
        doc.setFontSize(12)
        doc.text(`${order.mobile}`, 40, 270)
        doc.setFontSize(12)
        doc.text(`${this.props.email}`, 40, 285)
        doc.setFontSize(12)
        doc.text(`${order.address}`, 40, 300)
        doc.autoTable({
            theme: 'grid',
            head: [['Garbage', 'Quantity(Kg)', 'Amount(Rs)']],
            body: value,
            startY: 335,
            styles: {
                fontStyle: 'bold',
            },
            headStyles: {
                valign: 'middle',
                halign: 'center'
            },
            columnStyles: {
                1: {
                    halign: "center"
                },
                2: {
                    halign:"center"
                }
            }
        })
        doc.setFontSize(15)
        doc.setTextColor(0, 128, 0)
        doc.text("Thanks For Connecting With Us", 180, 800)
        doc.save("invoice.pdf")
    }

    render() {
        let orders = null
        if (this.state.show) {
            orders = (
                <div className={classes.container}>
                    {this.props.orders.length !== 0 ? <h2 className={classes.title}>Your Orders</h2> : <h3 className={classes.title} style={{ marginBottom: "170px" }}>You have not placed any orders</h3>}
                    {
                        this.props.orders.map((order) => (
                            <div>
                                <div className={classes.details}>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Order Placed : </span><br />
                                        <span>{format(new Date(order.createdAt), "dd-MM-yyyy   hh:mm:ss a")}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Pickup From : </span><br />
                                        <span>{order.name}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Order Id:</span><br />
                                        <span>#{order._id}</span>
                                    </div>

                                </div>
                                <div className={classes.order} key={order._id}>
                                    <div className={classes.card}>
                                        {order.garbage[0].paper.length !== 0 ?
                                            <div className={classes.item}>
                                                <span style={{ margin: "auto 5px", fontWeight: "bold" }}>Paper :</span> {order.garbage[0].paper.map((paper) => (
                                                    <div className={classes.box}>
                                                        {paper.name}
                                                    </div>
                                                ))}

                                            </div> : null}
                                        {order.garbage[1].plastic.length !== 0 ?
                                            <div className={classes.item}>
                                                <span style={{ margin: "auto 5px", fontWeight: "bold" }}>Plastic :</span> {order.garbage[1].plastic.map((plastic) => (
                                                    <div className={classes.box}>
                                                        {plastic.name}
                                                    </div>
                                                ))}
                                            </div> : null}
                                        {order.garbage[2].metal.length !== 0 ?
                                            <div className={classes.item}>
                                                <span style={{ margin: "auto 5px", fontWeight: "bold" }}>Metal :</span> {order.garbage[2].metal.map((metal) => (
                                                    <div className={classes.box}>
                                                        {metal.name}
                                                    </div>
                                                ))}

                                            </div> : null}
                                        {order.garbage[3].ewaste.length !== 0 ?
                                            <div className={classes.item}>
                                                <span style={{ margin: "auto 5px", fontWeight: "bold" }}>E-Waste :</span> {order.garbage[3].ewaste.map((ewaste) => (
                                                    <div className={classes.box}>
                                                        {ewaste.name}
                                                    </div>
                                                ))}

                                            </div> : null}
                                        {order.garbage[4].other.length !== 0 ?
                                            <div className={classes.item}>
                                                <span style={{ margin: "auto 5px", fontWeight: "bold" }}>Other :</span> {order.garbage[4].other.map((other) => (
                                                    <div className={classes.box}>
                                                        {other.name}
                                                    </div>
                                                ))}

                                            </div> : null}
                                    </div>
                                    <div className={classes.card}>
                                        <span><span style={{ fontWeight: "bold" }}>Name : </span>{order.name}</span><br />
                                        <span><span style={{ fontWeight: "bold" }}>Address : </span>{order.address}</span><br />
                                        <span><span style={{ fontWeight: "bold" }}>Mobile Number : </span>{order.mobile}</span><br />
                                        <span><span style={{ fontWeight: "bold" }}>Status : </span>{order.status}</span><br />
                                        <span><span style={{ fontWeight: "bold" }}>Weight : </span>{order.weight}</span><br />
                                        <span><span style={{ fontWeight: "bold" }}>Pickup Slot : </span>{order.pickupslot}</span>
                                    </div>
                                    <div className={classes.card}>
                                        {order.status === "pending" ? <div><button className={classes.change} onClick={(e) => this.onchangeaddress(e, order._id)}>Change address</button>
                                            <button className={classes.cancel} onClick={(e) => this.oncancel(e, order._id)}>Cancel order</button></div> :
                                            <div><button className={classes.invoice} onClick={(e) => this.oninvoice(e, order)}>Print invoice</button></div>}
                                    </div>
                                </div>
                            </div>))
                    }

                </div>
            )
        }

        let updateaddress = null
        if (!this.state.show) {
            updateaddress = (
                <div className={classes.container}>
                    <h2 className={classes.title} style={{ marginBottom: "30px" }}>Update Your pickup Address</h2>
                    <div className={classes.address}>
                        <label><b>New Address</b></label>
                        <textarea placeholder="Enter New Address" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} required />
                        <button style={{ width: "150px" }} onClick={(e) => this.updateaddress(e)}>Update</button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {orders}
                {updateaddress}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.Order.orders.reverse(),
        confirmorder: state.Order.confirmOrder,
        email: state.Order.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getorders: () => dispatch(actions.getorders()),
        cancelorder: (id) => dispatch(actions.cancelorder(id)),
        updateorderaddress: (id, address) => dispatch(actions.updateorderaddress(id, address)),
        getconfirmorder: (id) => dispatch(actions.getconfirmorder(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))