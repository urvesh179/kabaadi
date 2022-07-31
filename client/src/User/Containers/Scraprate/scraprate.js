import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux-store/Actions/orderAction'

import classes from './scraprate.css'

class Scraprate extends Component {

    componentDidMount = async () => {
        await this.props.getgarbage()
    }
    render() {

        const Scraprate = (
            <div className={classes.container}>
                <div className={classes.container1}>
                    <p style={{ color: "#444", fontWeight: "bold", fontSize: "38px" }}>Scrap Price</p>
                    <h6 style={{ color: "#828282", marginTop: "-15px" }}>We do not buy wood, cloth and glass</h6>

                    {this.props.garbage.map(scrap => (
                        <div className={classes.paper} key={scrap._id}>
                            <div style={{ display: "flex" }}>
                                <h5 style={{ color: "#444", fontWeight: "bold" }}>{scrap.category}</h5>
                                <div style={{ borderTop: "2px solid gray", width: "600px", marginInlineStart: "30px", marginTop: "13px" }}></div>
                                <div style={{ marginInlineStart: "8px", marginTop: "-3px" }}><h4>&#x3e;</h4></div>
                            </div>
                            <div className={classes.paperinfo}>
                                {scrap.subcatagory.map(scrapitem => (
                                    <div key={scrapitem._id} className={classes.items}>
                                        <h6 className={classes.itemname}>{scrapitem.name}</h6>
                                        <h6 className={classes.itemname}>&#x20B9; {scrapitem.rate}/{scrapitem.quntityin}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )

        return (
            <div>
                {Scraprate}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        garbage : state.Order.garbage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getgarbage: () => dispatch(actions.getgarbage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scraprate)