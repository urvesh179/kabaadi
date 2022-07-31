import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as action from '../../redux-store/Actions/orderAction'

import classes from './addDetails.css'
const d = new Date()
const nd = new Date(d.getTime() + (24 * 60 * 60 * 1000))
const nnd = new Date(nd.getTime() + (24 * 60 * 60 * 1000))
class AddDetail extends Component {
    state = {
        name: this.props.name,
        mobile: this.props.mobile,
        garbage: this.props.garbage,
        address: "",
        weight: "",
        pickupslot: "",
        error: {}
    }

    validate = () => {
        let error = {}
        let isvalid = true
        let name = this.state.name
        let mobile = this.state.mobile
        let address = this.state.address
        let weight = this.state.weight
        let pickupslot = this.state.pickupslot
        if (name === "") {
            error.name = "Name must be required"
            isvalid = false
        }
        if (mobile === "" || mobile.toString().length < 10 || mobile.toString().length > 10) {
            error.mobile = "Mobile number must be 10 digit long"
            isvalid = false
        }
        if (address === "" || address.length < 30) {
            error.address = "Enter valid address"
            isvalid = false
        }
        if (weight === "select weight" || weight === "") {
            error.weight = "Please select aprox weight of garbage"
            isvalid = false
        }
        if (pickupslot === "select pickup slot" || pickupslot === "") {
            error.pickupslot = "please select pickup slot"
            isvalid = false
        }

        this.setState({ error })
        return isvalid


    }
    onsubmit = async () => {
        const isvalid = this.validate()
        if (isvalid) {
            const order = {
                name: this.state.name,
                mobile: this.state.mobile,
                garbage: this.state.garbage,
                address: this.state.address,
                weight: this.state.weight,
                pickupslot: this.state.pickupslot,
            }

            await this.props.sendorder(order)
            this.setState({ error: {} })
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className={classes.main}>
                <h3 className={classes.title}>Add Your Details</h3>
                <div className={classes.container}>
                    <label><b>Name</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.name ? this.state.error.name : null}</span>
                    <input type="text" placeholder="Enter First name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} required />

                    <label><b>Mobile Number</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.mobile ? this.state.error.mobile : null}</span>
                    <input type="number" placeholder="Enter Mobile number" value={this.state.mobile} onChange={(e) => this.setState({ mobile: e.target.value })} required />

                    <label><b>Address</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.address ? this.state.error.address : null}</span>
                    <textarea placeholder="Enter Address" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} required />

                    <label><b>Approx Weight of Garbage</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.weight ? this.state.error.weight : null}</span>
                    <select className={classes.weight} value={this.state.weight} onChange={(e) => this.setState({ weight: e.target.value })} >
                        <option value="select weight">select Weight</option>
                        <option value="20Kg to 50Kg">20Kg to 50Kg</option>
                        <option value="50Kg to 100Kg">50Kg to 100Kg</option>
                        <option value="100Kg to 200Kg">100Kg to 200Kg</option>
                        <option value="200Kg to 500Kg">200Kg to 500Kg</option>
                        <option value="500 Up">500 Up</option>
                    </select>

                    <label><b>Pickup Slot</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.pickupslot ? this.state.error.pickupslot : null}</span>
                    <select className={classes.weight} value={this.state.pickupslot} onChange={(e) => this.setState({ pickupslot: e.target.value })}>
                        <option>select pickup slot</option>
                        <option>{nd.getDate()}/{nd.getMonth() + 1}/{nd.getFullYear()}  09 AM to 01 PM</option>
                        <option>{nd.getDate()}/{nd.getMonth() + 1}/{nd.getFullYear()}  02 PM to 06 PM</option>
                        <option>{nnd.getDate()}/{nnd.getMonth() + 1}/{nnd.getFullYear()}  09 AM to 01 PM</option>
                        <option>{nnd.getDate()}/{nnd.getMonth() + 1}/{nnd.getFullYear()}  02 PM to 06 PM</option>
                    </select>

                    <Link to="/"><button className={classes.btncancel}>Cancel</button></Link>
                    <button className={classes.btnsuccess} onClick={(e) => this.onsubmit(e)}>Submit</button>
                </div>
            </div>
        )
    }

}

const mapdispatchtoprops = (dispatch) => {
    return {
        sendorder: (order) => dispatch(action.sendorder(order))
    }
}




export default withRouter(connect(null, mapdispatchtoprops)(AddDetail))