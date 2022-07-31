import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import isemail from 'validator/lib/isEmail'

import * as actions from '../../redux-store/actions/gcactions'
import classes from './GCDetails.css'

const GCDetails = (props) => {

    const [displaygc, setdisplaygc] = useState(true)
    const [creategc, setcreategc] = useState(false)
    const [displaysm, setdisplaysm] = useState(false)
    const [state, setstate] = useState({
        name: "",
        email: "",
        mobile: "",
        citylist: ["Surat", "Rajkot", "Ahmedabad", "Vadodara", "Gandhinagar", "Bhavnagar", "Jamnagar", "Anand", "Navsari", "Morbi", "Bharuch", "Nadiad", "Junagadh", "Amreli",],
        city: '',
        password: "",
        address: "",
        inputamount: null,
        sendmoneyId: '',
        errors: {},
        amountError: '',
        valid: false,
    })

    useEffect(() => {
        async function fetchrecord() {
            await props.getgc()
            await props.getwallet()
        }
        fetchrecord()
    }, [])

    const onaddgc = (e) => {
        e.preventDefault()
        setdisplaygc(false)
        setcreategc(true)
    }

    const validate = () => {
        let name = state.name
        let email = state.email
        let mobile = state.mobile
        let city = state.city
        let password = state.password
        let address = state.address
        let isvalid = true
        let error = {}
        if (name === "") {
            isvalid = false
            error.name = "name must be required"
        }
        if (email === "") {
            isvalid = false
            error.email = "email must be required"
        } else if (!isemail(email)) {
            isvalid = false
            error.email = "enter valid email"
        }
        if (mobile?.toString().length < 10 || mobile?.toString().length > 10) {
            isvalid = false
            error.mobile = "mobile number must be equal 10 digit"
        }
        if (city === "select-city" || city === "") {
            isvalid = false
            error.city = "city must be required"

        }
        if (password === "" || password.toString().length < 8) {
            isvalid = false
            error.password = "enter valid passwprd"
        }
        if (address === "" || address.length < 20) {
            error.address = "Enter valid address"
            isvalid = false
        }

        setstate({ ...state, errors: error })

        return isvalid

    }

    const addgchandler = async (e) => {
        e.preventDefault()
        try {
            const isvalid = validate()
            if (isvalid) {
                const gc = {
                    name: state.name,
                    email: state.email,
                    mobile: state.mobile,
                    city: state.city,
                    password: state.password,
                    address: state.address
                }
                await props.addgc(gc)
                await props.getgc()
                setstate({ ...state, name: '', email: '', mobile: '', city: '', password: '', address: '' })
                setdisplaygc(true)
                setcreategc(false)
            }
        }
        catch (e) {
        }
    }

    const onsendmoney = (e, id) => {
        e.preventDefault()
        setstate({ sendmoneyId: id })
        setdisplaysm(true)
        setdisplaygc(false)
    }

    const onaddgccancel = (e) => {
        e.preventDefault()
        setdisplaygc(true)
        setcreategc(false)
        setstate({ ...state, errors: {}, name: '', email: '', mobile: '', city: '', password: '', address: '' })
    }

    const oncancel = async (e, id) => {
        e.preventDefault()
        await props.cancelgc(id)
        if(localStorage.getItem('gcId')===id){
            localStorage.removeItem('gcId')
            localStorage.removeItem('gctoken')
        }
        await props.getgc()
    }

    const onaddmoneycancel = (e) => {
        e.preventDefault()
        setstate({ sendmoneyId: '' })
        setstate({ amountError: '' })
        setdisplaysm(false)
        setdisplaygc(true)
    }

    const onaddmoneysuccess = async (e) => {
        e.preventDefault()
        let error = ''
        if (state.inputamount > props.adminWalletAmount) {
            error = 'Insufficient Balance'
        } else {
            error = ''
            await props.sendmoney(state.sendmoneyId, state.inputamount)
            setstate({ sendmoneyId: '' })
            await props.getgc()
            setdisplaysm(false)
            setdisplaygc(true)
        }
        setstate({ ...state, amountError: error })
    }

    return (
        <div>
            {displaygc ? <div className={classes.container}>
                <div className={classes.combine}>
                    <span>{<button className={classes.change} onClick={(e) => onaddgc(e)}>Add Garbage Collector</button>}</span>
                    <span>{props.gcs.length !== 0 ? <h2 className={classes.title}>Garbage Collectors</h2> : <h3 className={classes.title} style={{ marginBottom: "30px" }}>You have not any Garbage Collector</h3>}</span>
                </div>
                {
                    props.gcs.map(gc => (
                        <div key={gc._id}>
                            <div className={classes.details}>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Garbage Collector Created: </span><br />
                                    <span>{format(new Date(gc.createdAt), "dd-MM-yyyy   hh:mm:ss a")}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: "bold" }}>Garbage Collector ID:</span><br />
                                    <span>#{gc._id}</span>
                                </div>
                            </div>
                            <div className={classes.order} key={gc._id}>
                                <div className={classes.card}>
                                    <span><span style={{ fontWeight: "bold" }}>Name : </span>{gc.name}</span><br />
                                    <span><span style={{ fontWeight: "bold" }}>Email : </span>{gc.email}</span><br />
                                    <span><span style={{ fontWeight: "bold" }}>Mobile Number : </span>{gc.mobile}</span><br />
                                    <span><span style={{ fontWeight: "bold" }}>Address : </span>{gc.address}</span><br />
                                    <span><span style={{ fontWeight: "bold" }}>City : </span>{gc.city}</span><br />
                                    <span><span style={{ fontWeight: "bold" }}>WalletAmount : </span>{gc.walletAmount}</span>
                                </div>
                                <div className={classes.card}>
                                    <div className={classes.card2}>
                                        <button className={classes.change2} onClick={(e) => onsendmoney(e, gc._id)}>Send Money</button>
                                        <button className={classes.cancel} onClick={(e) => oncancel(e, gc._id)}>Cancel Garbage Collector</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div> : null}
            {/* add garbage collector */}
            {creategc ? <div>
                <div className={classes.container1}>
                    <form style={{ border: "1px solid #ccc" }}>
                        <div className={classes.container2}>
                            <h1>Add Garbage Collector</h1>
                            <p>Please fill in this form to add garbage collector.</p>
                            <hr />
                            <label for="name"><b>Name</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.name ? state.errors.name : null}</span></label>
                            <input type="text" placeholder="Enter First Name" name="name" value={state.name} onChange={(e) => setstate({ ...state, name: e.target.value })} required autoComplete="off" />

                            <label for="email"><b>Email</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.email ? state.errors.email : null}</span></label>
                            <input type="text" placeholder="Enter Email" name="email" value={state.email} onChange={(e) => setstate({ ...state, email: e.target.value })} required autoComplete="off" />

                            <label for="mobile"><b>Mobile Number</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.mobile ? state.errors.mobile : null}</span></label>
                            <input type="number" placeholder="Enter Mobile number" name="mobile" value={state.mobile} onChange={(e) => setstate({ ...state, mobile: e.target.value })} required />

                            {/* <label for="city"><b>city</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.city ? state.errors.city : null}</span></label>
                            <input type="text" placeholder="Enter City" name="city" value={state.city} onChange={(e) => setstate({ ...state, city: e.target.value })} required /> */}

                            <label for="city"><b>Choose city</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.city ? state.errors.city : null}</span></label>
                            <select name="city" id="city" className={classes.city} value={state.city} onChange={(e) => setstate({ ...state, city: e.target.value })}>
                                <option value="select-city" >select-city</option>
                                {state.citylist.map(city => {
                                    return (
                                        <option value={city} onChange={(e) => setstate({ ...state, city: e.target.value })} key={city}>{city}</option>
                                    )
                                })}
                            </select>

                            <label for="password"><b>Password</b><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.password ? state.errors.password : null}</span></label>
                            <input type="password" placeholder="Enter Password" name="password" value={state.password} onChange={(e) => setstate({ ...state, password: e.target.value })} required />

                            <label><b>Address</b></label><span style={{ color: "red", marginLeft: "20px" }}>{state.errors?.address ? state.errors.address : null}</span>
                            <textarea placeholder="Enter Address" value={state.address} onChange={(e) => setstate({ ...state, address: e.target.value })} required />

                            <span style={{ margin: "15px 0", color: "red" }}>{props.error ? props.error : null}</span>

                            <div class={classes.clearfix}>
                                <button type="button" class={classes.cancelbtn} onClick={(e) => onaddgccancel(e)}>Cancel</button>
                                <button type="submit" class={classes.signupbtn} onClick={(e) => addgchandler(e,)}>Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div> : null}
            {/* display add amount details */}
            {displaysm ? <div className={classes.redeemamt}>
                <label><b>Enter Amount</b></label>{<span style={{ color: "red", marginLeft: "20px" }}>{state.amountError ? state.amountError : null}</span>}
                <input type="number" placeholder="Enter Amount" required onChange={(e) => setstate({ ...state, inputamount: e.target.value })} className={classes.amountInput} /><br />
                <button className={classes.btncancel} onClick={(e) => onaddmoneycancel(e)}>Cancel</button>
                <button className={classes.btnsuccess} onClick={(e) => onaddmoneysuccess(e)}>Send</button>
            </div> : null}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        gcs: state.Admin.gcs.reverse(),
        error: state.Admin.error,
        adminWalletAmount: state.Admin.adminWalletAmount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getgc: () => dispatch(actions.getgc()),
        addgc: (gc) => dispatch(actions.addgc(gc)),
        cancelgc: (id) => dispatch(actions.cancelgc(id)),
        getwallet: () => dispatch(actions.getadminwallet()),
        sendmoney: (id, money) => dispatch(actions.sendmoney(id, money))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GCDetails)