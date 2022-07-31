import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AddDetail from './addDetails'

import ewaste from '../../../images/e-waste.png'
import metal from '../../../images/metal.png'
import plastic from '../../../images/plastic.png'
import paper from '../../../images/paper.png'
import other from '../../../images/other-items.png'
import right1 from '../../../images/right1.png'
import right2 from '../../../images/right2.png'
import * as actions from '../../redux-store/Actions/orderAction'

import classes from './PickupReq.css'

class PickupReq extends Component {
    state = {
        papersel: false,
        plasticsel: false,
        metalsel: false,
        ewastesel: false,
        othersel: false,
        error: "",
        show: true,
        selectedscrap: [{ paper: [] }, { plastic: [] }, { metal: [] }, { ewaste: [] }, { other: [] }],
    }

    componentDidMount = async () => {
        await this.props.getgarbage()
    }

    paperclick = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ papersel: !prevstate.papersel }))
    }
    plasticclick = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ plasticsel: !prevstate.plasticsel }))
    }
    metalclick = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ metalsel: !prevstate.metalsel }))
    }
    ewasteclick = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ ewastesel: !prevstate.ewastesel }))
    }
    otherclick = (e) => {
        e.preventDefault()
        this.setState(prevstate => ({ othersel: !prevstate.othersel }))
    }

    onpaperselect = (e, item) => {
        this.setState({ error: "" })
        let selectedscrapp = [...this.state.selectedscrap]
        if (selectedscrapp[0].paper.some(scrap=>scrap.name===item.name)) {            
            selectedscrapp[0].paper= selectedscrapp[0].paper.filter(scrap=>scrap.name!==item.name)
            e.target.style.backgroundColor = "whitesmoke"
        } else {
            if(item.quntityin==="piece"){
                selectedscrapp[0].paper.push({name:item.name,quantityin:item.quntityin,rate:item.rate,defaultWeight:item.defaultWeight})
            }else{
                selectedscrapp[0].paper.push({name:item.name,quantityin:item.quntityin,rate:item.rate})
            }
            
            e.target.style.backgroundColor = "lightgreen"
        }
        this.setState({ selectedscrap: selectedscrapp })
    }

    onplasticselect = (e, item) => {
        this.setState({ error: "" })
        let selectedscrapp = [...this.state.selectedscrap]
        if (selectedscrapp[1].plastic.some(scrap=>scrap.name===item.name)) {            
            selectedscrapp[1].plastic= selectedscrapp[1].plastic.filter(scrap=>scrap.name!==item.name)
            e.target.style.backgroundColor = "whitesmoke"
        } else {
            if(item.quntityin==="piece"){
                selectedscrapp[1].plastic.push({name:item.name,quantityin:item.quntityin,rate:item.rate,defaultWeight:item.defaultWeight})
            }else{
                selectedscrapp[1].plastic.push({name:item.name,quantityin:item.quntityin,rate:item.rate})
            }
            
            e.target.style.backgroundColor = "lightgreen"
        }
        this.setState({ selectedscrap: selectedscrapp })
    }

    onmetalselect = (e, item) => {
        this.setState({ error: "" })
        let selectedscrapp = [...this.state.selectedscrap]
        if (selectedscrapp[2].metal.some(scrap=>scrap.name===item.name)) {            
            selectedscrapp[2].metal= selectedscrapp[2].metal.filter(scrap=>scrap.name!==item.name)
            e.target.style.backgroundColor = "whitesmoke"
        } else {
            if(item.quntityin==="piece"){
                selectedscrapp[2].metal.push({name:item.name,quantityin:item.quntityin,rate:item.rate,defaultWeight:item.defaultWeight})
            }else{
                selectedscrapp[2].metal.push({name:item.name,quantityin:item.quntityin,rate:item.rate})
            }
            
            e.target.style.backgroundColor = "lightgreen"
        }
        this.setState({ selectedscrap: selectedscrapp })
    }

    onewasteselect = (e, item) => {
        this.setState({ error: "" })
        let selectedscrapp = [...this.state.selectedscrap]
        if (selectedscrapp[3].ewaste.some(scrap=>scrap.name===item.name)) {            
            selectedscrapp[3].ewaste= selectedscrapp[3].ewaste.filter(scrap=>scrap.name!==item.name)
            e.target.style.backgroundColor = "whitesmoke"
        } else {
            if(item.quntityin==="piece"){
                selectedscrapp[3].ewaste.push({name:item.name,quantityin:item.quntityin,rate:item.rate,defaultWeight:item.defaultWeight})
            }else{
                selectedscrapp[3].ewaste.push({name:item.name,quantityin:item.quntityin,rate:item.rate})
            }
            
            e.target.style.backgroundColor = "lightgreen"
        }
        this.setState({ selectedscrap: selectedscrapp })
    }

    onotherselect = (e, item) => {
        this.setState({ error: "" })
        let selectedscrapp = [...this.state.selectedscrap]
        if (selectedscrapp[4].other.some(scrap=>scrap.name===item.name)) {            
            selectedscrapp[4].other= selectedscrapp[4].other.filter(scrap=>scrap.name!==item.name)
            e.target.style.backgroundColor = "whitesmoke"
        } else {
            if(item.quntityin==="piece"){
                selectedscrapp[4].other.push({name:item.name,quantityin:item.quntityin,rate:item.rate,defaultWeight:item.defaultWeight})
            }else{
                selectedscrapp[4].other.push({name:item.name,quantityin:item.quntityin,rate:item.rate})
            }
            
            e.target.style.backgroundColor = "lightgreen"
        }
        this.setState({ selectedscrap: selectedscrapp })
    }

    oncontinue = (e) => {
        e.preventDefault()
        let isvalid = true
        if (this.state.selectedscrap[0].paper.length === 0 && this.state.selectedscrap[1].plastic.length === 0 && this.state.selectedscrap[2].metal.length === 0 && this.state.selectedscrap[3].ewaste.length === 0 && this.state.selectedscrap[4].other.length === 0) {
            isvalid = false
        }
        if (!isvalid) {
            this.setState({ error: "You have not choose any items..please select items first" })
        } else {
            this.setState({ show: false })
        }

    }

    render() {

        let selectGarbage = null
        if (this.state.show) {
            selectGarbage = (
                <>
                    <div className={classes.selectgarbage}>
                        <div className={classes.userinfo}>
                            <h5 style={{ color: "#6c757d", marginRight: "110px", fontSize: "25px" }}>Hiii...{this.props.user.name}</h5>
                            <h6 style={{ color: "#444", fontWeight: "bold", fontSize: "20px" }}>What would you to sell?</h6>
                        </div>
                        <div className={classes.items}>
                            <div className={classes.item} onClick={(e) => this.paperclick(e)} style={{ backgroundColor: this.state.papersel ? "#dff0d8" : null }}>
                                {this.state.papersel ? <img className={classes.right1} style={{ width: "23px" }} src={right2} alt="right2"/> : <img className={classes.right1} src={right1} alt="right1"/>}
                                <img className={classes.icon} src={paper} alt="paper"/>
                                <h6>Paper</h6>
                            </div>
                            <div className={classes.item} onClick={(e) => this.plasticclick(e)} style={{ backgroundColor: this.state.plasticsel ? "#dff0d8" : null }}>
                                {this.state.plasticsel ? <img className={classes.right1} style={{ width: "23px" }} src={right2} alt="right2"/> : <img className={classes.right1} src={right1} alt="right1"/>}
                                <img className={classes.icon} src={plastic} alt="plastic"/>
                                <h6 style={{ marginTop: "-10px" }}>Plastic</h6>
                            </div>
                            <div className={classes.item} onClick={(e) => this.metalclick(e)} style={{ backgroundColor: this.state.metalsel ? "#dff0d8" : null }}>
                                {this.state.metalsel ? <img className={classes.right1} style={{ width: "23px" }} src={right2} alt="right2"/> : <img className={classes.right1} src={right1} alt="right1"/>}
                                <img className={classes.icon} src={metal} alt="metal"/>
                                <h6 style={{ marginTop: "-10px" }}>Metal</h6>
                            </div>
                            <div className={classes.item} onClick={(e) => this.ewasteclick(e)} style={{ backgroundColor: this.state.ewastesel ? "#dff0d8" : null }}>
                                {this.state.ewastesel ? <img className={classes.right1} style={{ width: "23px" }} src={right2} alt="right2"/> : <img className={classes.right1} src={right1} alt="right1"/>}
                                <img className={classes.icon} src={ewaste} alt="ewaste"/>
                                <h6 style={{ marginTop: "-3px" }}>E-Waste</h6>
                            </div>
                            <div className={classes.item} onClick={(e) => this.otherclick(e)} style={{ backgroundColor: this.state.othersel ? "#dff0d8" : null }}>
                                {this.state.othersel ? <img className={classes.right1} style={{ width: "23px" }} src={right2} alt="right2"/> : <img className={classes.right1} src={right1} alt="right1"/>}
                                <img className={classes.icon} src={other} alt="other"/>
                                <h6 style={{ marginTop: "-10px" }}>Others</h6>
                            </div>
                        </div>

                        <div className={classes.container1}>
                            {this.state.papersel ? <>
                                <h5 style={{ color: "#444", margin: "-20px 0px 0px -720px", fontSize: "22px" }}>Paper:</h5>
                                <div className={classes.paperinfo}>
                                    {this.props.garbage[0].subcatagory.map(item => (
                                        <div className={classes.itemss} key={item.name} onClick={(e) => this.onpaperselect(e, item)}>
                                            {item.name}<br />
                                            {item.rate}/{item.quntityin}
                                        </div>
                                    ))}
                                </div>
                            </> : null}
                            {this.state.plasticsel ? <>
                                <h5 style={{ color: "#444", margin: "-20px 0px 0px -720px", fontSize: "22px" }}>Plastic:</h5>
                                <div className={classes.paperinfo}>
                                    {this.props.garbage[1].subcatagory.map(item => (
                                        <div className={classes.itemss} key={item.name} onClick={(e) => this.onplasticselect(e, item)}>
                                            {item.name}<br />
                                            {item.rate}/{item.quntityin}
                                        </div>
                                    ))}
                                </div>
                            </> : null}
                            {this.state.metalsel ? <>
                                <h5 style={{ color: "#444", margin: "-20px 0px 0px -720px", fontSize: "22px" }}>Metal:</h5>
                                <div className={classes.paperinfo}>
                                    {this.props.garbage[2].subcatagory.map(item => (
                                        <div className={classes.itemss} key={item.name} onClick={(e) => this.onmetalselect(e, item)}>
                                            {item.name}<br />
                                            {item.rate}/{item.quntityin}
                                        </div>
                                    ))}
                                </div>
                            </> : null}
                            {this.state.ewastesel ? <>
                                <h5 style={{ color: "#444", margin: "-20px 0px 0px -720px", fontSize: "22px" }}>E-Waste:</h5>
                                <div className={classes.paperinfo}>
                                    {this.props.garbage[3].subcatagory.map(item => (
                                        <div className={classes.itemss} key={item.name} onClick={(e) => this.onewasteselect(e, item)}>
                                            {item.name}<br />
                                            {item.rate}/{item.quntityin}
                                        </div>
                                    ))}
                                </div>
                            </> : null}
                            {this.state.othersel ? <>
                                <h5 style={{ color: "#444", margin: "-20px 0px 0px -720px", fontSize: "22px" }}>Other:</h5>
                                <div className={classes.paperinfo}>
                                    {this.props.garbage[4].subcatagory.map(item => (
                                        <div className={classes.itemss} key={item.name} onClick={(e) => this.onotherselect(e, item)}>
                                            {item.name}<br />
                                            {item.rate}/{item.quntityin}
                                        </div>
                                    ))}
                                </div>
                            </> : null}
                        </div>
                        <div style={{ color: "red", marginBottom: "10px" }}>{this.state.error ? this.state.error : null}</div>
                        <div className={classes.continue} onClick={(e) => this.oncontinue(e)}>Continue</div>
                    </div>
                </>
            )
        }

        let adddetails = null
        if (!this.state.show) {
            adddetails = <AddDetail
                name={this.props.user.name}
                mobile={this.props.user.mobile}
                garbage={this.state.selectedscrap}
            />
        }




        return (
            <div>
                <div className={classes.container}>
                    {selectGarbage}
                    {adddetails}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.User.user,
        garbage:state.Order.garbage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getgarbage: () => dispatch(actions.getgarbage())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PickupReq))