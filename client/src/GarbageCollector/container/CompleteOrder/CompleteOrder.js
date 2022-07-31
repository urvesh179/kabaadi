import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import * as actions from '../../redux-store/Actions/garbagecollactions'

import classes from './CompleteOrder.css'

const CompleteOrder = (props) => {

    const history = useHistory()

    const [showmodal, setshowmodal] = useState(false)
    const [state, sestate] = useState({})
    const [amount, setamount] = useState({})
    const [error, seterror] = useState("")
    const [paper, setpaper] = useState([])
    const [plastic, setplastic] = useState([])
    const [metal, setmetal] = useState([])
    const [ewaste, setewaste] = useState([])
    const [other, setother] = useState([])
    const [totalWeight, settotalWeight] = useState(null)
    const [totalAmount, settotalAmount] = useState(null)

    useEffect(() => {
        async function fetchorder() {
            await props.getorderbyid(props.match.params.id)
        }
        fetchorder()
    }, [])

    const onstatechange = (e, name, rate) => {
        e.preventDefault()
        const ans = parseFloat(parseFloat(e.target.value * rate).toFixed(2))
        const w = e.target.value
        const weight = parseFloat(parseFloat(w).toFixed(2))
        sestate({ ...state, [name]: weight })
        setamount({ ...amount, [name]: ans })
    }

    let len = 0
    for (let i = 0; i < props.order.garbage?.length; i++) {
        len += Object.values(props.order.garbage[i])[0]?.length
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        let paper = []
        let plastic = []
        let metal = []
        let ewaste = []
        let other = []
        let error = ""
        let isValid = true
        const val = Object.values(state).length
        if (val !== len) {
            error = "Please fill Order Details"
            isValid = false
        } else {
            const valarr = Object.values(state).some(val => val === "")
            if (valarr) {
                isValid = false
                error = "Please fill Order Details"
            }
        }
        if (isValid) {
            Object.values(props.order.garbage[0])[0].map(item => {
                Object.keys(state).map(name => {
                    if (name === item.name) {
                        if (item.quantityin === "Kg") {
                            const sc = {
                                name: name,
                                weight: state[name],
                                amount: amount[name]
                            }
                            paper.push(sc)

                        } else {
                            const sc = {
                                name: name,
                                weight: parseFloat((parseInt(state[name]) * (item.defaultWeight)).toFixed(3)),
                                amount: amount[name]
                            }
                            paper.push(sc)
                        }
                    }
                })
            })
            Object.values(props.order.garbage[1])[0].map(item => {
                Object.keys(state).map(name => {
                    if (name === item.name) {
                        if (item.quantityin === "Kg") {
                            const sc = {
                                name: name,
                                weight: state[name],
                                amount: amount[name]
                            }
                            plastic.push(sc)

                        } else {
                            const sc = {
                                name: name,
                                weight: parseFloat((parseInt(state[name]) * (item.defaultWeight)).toFixed(3)),
                                amount: amount[name]
                            }
                            plastic.push(sc)
                        }
                    }
                })
            })
            Object.values(props.order.garbage[2])[0].map(item => {
                Object.keys(state).map(name => {
                    if (name === item.name) {
                        if (item.quantityin === "Kg") {
                            const sc = {
                                name: name,
                                weight: state[name],
                                amount: amount[name]
                            }
                            metal.push(sc)

                        } else {
                            const sc = {
                                name: name,
                                weight: parseFloat((parseInt(state[name]) * (item.defaultWeight)).toFixed(3)),
                                amount: amount[name]
                            }
                            metal.push(sc)
                        }
                    }
                })
            })
            Object.values(props.order.garbage[3])[0].map(item => {
                Object.keys(state).map(name => {
                    if (name === item.name) {
                        if (item.quantityin === "Kg") {
                            const sc = {
                                name: name,
                                weight: state[name],
                                amount: amount[name]
                            }
                            ewaste.push(sc)

                        } else {
                            const sc = {
                                name: name,
                                weight: parseFloat((parseInt(state[name]) * (item.defaultWeight)).toFixed(3)),
                                amount: amount[name]
                            }
                            ewaste.push(sc)
                        }
                    }
                })
            })
            Object.values(props.order.garbage[4])[0].map(item => {
                Object.keys(state).map(name => {
                    if (name === item.name) {
                        if (item.quantityin === "Kg") {
                            const sc = {
                                name: name,
                                weight: state[name],
                                amount: amount[name]
                            }
                            other.push(sc)

                        } else {
                            const sc = {
                                name: name,
                                weight: parseFloat((parseInt(state[name]) * (item.defaultWeight)).toFixed(3)),
                                amount: amount[name]
                            }
                            other.push(sc)
                        }
                    }
                })
            })
            let tpaperw = 0
            let tpapera = 0
            for (let i = 0; i < paper.length; i++) {
                tpaperw += paper[i].weight
                tpapera += paper[i].amount
            }
            const paperobj = {
                totalPaperWeight: tpaperw,
                totalPaperAmount: tpapera
            }
            paper.push(paperobj)

            let tplasticw = 0
            let tplastica = 0
            for (let i = 0; i < plastic.length; i++) {
                tplasticw += plastic[i].weight
                tplastica += plastic[i].amount
            }
            const plasticobj = {
                totalPlasticWeight: tplasticw,
                totalPlasticAmount: tplastica
            }
            plastic.push(plasticobj)

            let tmetalw = 0
            let tmetala = 0
            for (let i = 0; i < metal.length; i++) {
                tmetalw += metal[i].weight
                tmetala += metal[i].amount
            }
            const metalobj = {
                totalMetalWeight: tmetalw,
                totalMetalAmount: tmetala
            }
            metal.push(metalobj)

            let tewastew = 0
            let tewastea = 0
            for (let i = 0; i < ewaste.length; i++) {
                tewastew += ewaste[i].weight
                tewastea += ewaste[i].amount
            }
            const ewasteobj = {
                totaleWasteWeight: tewastew,
                totaleWasteAmount: tewastea
            }
            ewaste.push(ewasteobj)

            let totherw = 0
            let tothera = 0
            for (let i = 0; i < other.length; i++) {
                totherw += other[i].weight
                tothera += other[i].amount
            }
            const otherobj = {
                totalOtherWeight: totherw,
                totalOtherAmount: tothera
            }
            other.push(otherobj)
            const totalWeight = parseFloat((tpaperw + tplasticw + tmetalw + tewastew + totherw).toFixed(3))
            const totalAmount = parseFloat((tpapera + tplastica + tmetala + tewastea + tothera).toFixed(3))
            if (totalWeight < 20) {
                error = "Order Weight Must Be Greater Or Equal 20."
            }
            else {
                settotalWeight(totalWeight)
                settotalAmount(totalAmount)
                setpaper(paper)
                setplastic(plastic)
                setmetal(metal)
                setewaste(ewaste)
                setother(other)
                setshowmodal(true)
                seterror("")
            }
        }
        seterror(error)
    }

    const onsendmoney = async (e) => {
        e.preventDefault()
        const order = {
            orderId: props.order._id,
            city: props.order.city,
            garbage: {
                Paper: paper,
                Plastic: plastic,
                Metal: metal,
                Ewaste: ewaste,
                Other: other
            },
            totalWeight,
            totalAmount
        }
        await props.sendconfirmedorder(order)
        setshowmodal(false)
        history.push({ pathname: '/gc/dashboard' })
    }

    let completeOrder = (
        <div className={classes.details}>
            <h3 style={{ textAlign: "center", paddingTop: "10px", fontWeight: "bold" }}>Order Details</h3><br />
            <span><b>Name:</b> {props.order.name}</span><br />
            <span><b>Mobile No:</b> {props.order.mobile}</span><br />
            <span><b>Weight:</b> {props.order.weight}</span><br />
            <span><b>Address:</b> {props.order.address}</span><br /><br /><br />
            <h3 style={{ fontWeight: "bold" }}>Fill Garbage Details</h3><br />
            {props.order.garbage?.map(garbage => {
                return (
                    <div key={garbage}>
                        {/* {console.log()} */}
                        {(Object.values(garbage)).map(items => {
                            return (
                                <div key={items}>
                                    {items.length !== 0 ? <div className={classes.container1}>
                                        <h4>&#8226; {Object.keys(garbage)[0].charAt(0).toUpperCase() + Object.keys(garbage)[0].slice(1)}</h4>
                                        {items.map(item => {
                                            return (
                                                <div className={classes.info} key={item.name}>
                                                    <span style={{ marginTop: "-1px", fontSize: "18px", fontWeight: "500" }}>{item.name} </span>
                                                    <span style={{ position: "absolute", right: "780px", marginTop: "0px" }}>:</span>
                                                    {item.quantityin === "Kg" ? <input type="number" onChange={(e) => onstatechange(e, item.name, item.rate)} value={state[item.name]} placeholder="Enter Weight in Kg" style={{ width: "170px", position: "absolute", borderRadius: "5px", right: "600px", marginTop: "-5px" }} required /> :
                                                        <input type="number" onChange={(e) => onstatechange(e, item.name, item.rate)} value={state[item.name]} placeholder="Enter Quantity" style={{ width: "170px", position: "absolute", borderRadius: "5px", right: "600px", marginTop: "-5px" }} required />}
                                                </div>
                                            )
                                        })}
                                    </div> : null}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            <span style={{ color: "red" }}>{error ? error : null}</span>
            <div class={classes.clearfix}>
                <Link to="/gc/dashboard"><button type="button" class={classes.cancelbtn} >Cancel</button></Link>
                <button type="submit"
                    class={classes.signupbtn}
                    onClick={(e) => onSubmitHandler(e)} >Continue</button>
            </div>
        </div>
    )

    let modal = (
        <div>
            {showmodal ? <div className={classes.Backdrop} onClick={() => setshowmodal(false)}>

            </div> : null}
            <div
                className={classes.Modal}
                style={{
                    transform: showmodal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showmodal ? '1' : '0'
                }}>
                <div>
                    <h5 style={{ textAlign: "center" }}>Order Summary</h5>
                    <div className={classes.summary}>
                        <h6>Garbage</h6>
                        <h6>Quantity(Kg/piece)</h6>
                        <h6>Amount</h6>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "-35px" }}>
                            {Object.keys(state)?.map(name => {
                                return (
                                    <div key={name}>
                                        <span>{name}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "-10px" }}>
                            {Object.values(state)?.map(qut => {
                                return (
                                    <div key={qut}>
                                        <span>{qut}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                            {Object.values(amount)?.map(amt => {
                                return (
                                    <div key={amt}>
                                        <span>&#x20B9; {amt}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div><br />
                    <h5 style={{ marginLeft: "25px" }}>Total Amount : &#x20B9; {totalAmount}</h5><br />
                    <div style={{ display: "flex" }}>
                        <div style={{ color: "red", cursor: "pointer", fontWeight: "bold", marginLeft: "170px" }} onClick={() => setshowmodal(false)}>Cancel</div>
                        <div style={{ color: "green", cursor: "pointer", fontWeight: "bold", marginLeft: "50px" }} onClick={(e) => onsendmoney(e)}>Send Money</div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className={classes.container}>
            {completeOrder}
            {modal}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order: state.GC.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getorderbyid: (id) => dispatch(actions.getorderbyid(id)),
        sendconfirmedorder: (order) => dispatch(actions.sendconfirmedorder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder)