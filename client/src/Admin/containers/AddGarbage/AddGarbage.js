import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../User/redux-store/Actions/orderAction'
import * as adminaction from '../../redux-store/actions/gcactions'

import classes from './AddGarbage.css'

const AddGarbage = (props) => {

    const [showbuttoncard, setbuttoncard] = useState(true)
    const [showaddform, setaddform] = useState(false)
    const [showeditform, setshoweditform] = useState(false)
    const [showdeleteform, setshowdeleteform] = useState(false)
    const [showGarbageTable, setShowGarbageTable] = useState(true)
    const [creategarbage, setcg] = useState({
        category: "",
        newGarbageName: "",
        newGarbageRate: null,
        newGarbageQnt: "",
        newGError: {},
        defaultWeight:null
    })
    const [editform, seteditform] = useState({
        editCategory: "",
        editGarbageName: "",
        editGarbageRate: null,
        subcatagoryNum: null,
        editGError: {}
    })
    const [deleteform, setdeleteform] = useState({
        deleteCategory: "",
        deleteGarbageName: "",
        subcatagoryNum: null,
        deleteGError: {}
    })

    useEffect(() => {
        async function garbage() {
            await props.getgarbage()
        }
        garbage()
    }, [showaddform, showeditform, showdeleteform])

    const validate = () => {
        let cname = creategarbage.category
        let scname = creategarbage.newGarbageName
        let grate = creategarbage.newGarbageRate
        let gqnt = creategarbage.newGarbageQnt
        let dwgt=creategarbage.defaultWeight
        let error = {}
        let isvalid = true
        if (cname === "" || cname === "sc") {
            isvalid = false
            error.cname = "Please select Category"
        }
        if (scname === "") {
            isvalid = false
            error.scname = "Please Enter valid Garbage name"
        }
        if (grate === null) {
            isvalid = false
            error.grate = "Enter valid rate of Garbage"
        }
        if (gqnt === "sq" || gqnt === "") {
            isvalid = false
            error.gqnt = "Please select Quantity"
        }
        if(gqnt==="piece"){
            if(dwgt===null){
                error.dwgt="Please Enter default weight"
            }
        }
        setcg({ ...creategarbage, newGError: error })
        return isvalid
    }

    const onaddgarbage = async (e) => {
        e.preventDefault()
        const valid = validate()
        if (valid) {
            const gar = {
                category: creategarbage.category,
                subcatagory: creategarbage.newGarbageName,
                rate: creategarbage.newGarbageRate,
                quntityin: creategarbage.newGarbageQnt,
                defaultWeight:creategarbage.defaultWeight
            }
            await props.creategarbage(gar)
            setcg({
                category: "",
                newGarbageName: "",
                newGarbageRate: null,
                newGarbageQnt: "",
                newGError: {}
            })
            setaddform(false)
            setbuttoncard(true)
            setShowGarbageTable(true)
        }

    }

    const editvalidate = () => {
        let cname = editform.editCategory
        let scname = editform.editGarbageName
        let grate = editform.editGarbageRate
        let error = {}
        let isvalid = true
        if (cname === "sc" || cname === "") {
            isvalid = false
            error.cname = "Please select Category"
        }
        if (scname === 'sg' || scname === "") {
            isvalid = false
            error.scname = "please select Garbage"
        }
        if (grate === null) {
            isvalid = false
            error.grate = "Enter Valid rate of garbage"
        }
        seteditform({ ...editform, editGError: error })
        return isvalid
    }

    const oneditgarbage = async (e) => {
        e.preventDefault()
        const valid = editvalidate()
        if (valid) {
            const gar = {
                category: editform.editCategory,
                subcatagory: editform.editGarbageName,
                rate: editform.editGarbageRate,
            }
            await props.editgarbage(gar)
            seteditform({
                editCategory: "",
                editGarbageName: "",
                editGarbageRate: null,
                subcatagoryNum: null,
                newGError: {}
            })
            setshoweditform(false)
            setbuttoncard(true)
            setShowGarbageTable(true)
        }
    }

    const onstatechange = (e) => {
        let st = { ...editform, editCategory: e.target.value };
        //seteditform({ ...editform, editCategory: e.target.value })
        if (e.target.value === "Paper") {
            st = {
                ...st,
                subcatagoryNum: 0
            }
            // seteditform({ ...editform,  })
        }
        if (e.target.value === "Plastic") {
            st = {
                ...st,
                subcatagoryNum: 1
            }
        }
        if (e.target.value === "Metal") {
            st = {
                ...st,
                subcatagoryNum: 2
            }
        }
        if (e.target.value === "E-Waste") {
            st = {
                ...st,
                subcatagoryNum: 3
            }
        }
        if (e.target.value === "Other") {
            st = {
                ...st,
                subcatagoryNum: 4
            }
        }
        seteditform(st);
    }

    const ondeletestatechange = (e) => {
        let st = { ...deleteform, deleteCategory: e.target.value };
        if (e.target.value === "Paper") {
            st = {
                ...st,
                subcatagoryNum: 0
            }
        }
        if (e.target.value === "Plastic") {
            st = {
                ...st,
                subcatagoryNum: 1
            }
        }
        if (e.target.value === "Metal") {
            st = {
                ...st,
                subcatagoryNum: 2
            }
        }
        if (e.target.value === "E-Waste") {
            st = {
                ...st,
                subcatagoryNum: 3
            }
        }
        if (e.target.value === "Other") {
            st = {
                ...st,
                subcatagoryNum: 4
            }
        }
        setdeleteform(st);
    }

    const deletevalid = () => {
        let cname = deleteform.deleteCategory
        let scname = deleteform.deleteGarbageName
        let error = {}
        let isvalid = true
        if (cname === "sc" || cname === "") {
            isvalid = false
            error.cname = "Please select Category"
        }
        if (scname === 'sg' || scname === "") {
            isvalid = false
            error.scname = "please select Garbage"
        }
        setdeleteform({ ...deleteform, deleteGError: error })
        return isvalid
    }

    const ondeletegarbage = async (e) => {
        e.preventDefault()
        const valid = deletevalid()
        if (valid) {
            const gar = {
                category: deleteform.deleteCategory,
                subcatagory: deleteform.deleteGarbageName,
            }
            await props.deletegarbage(gar)
            setdeleteform({
                deleteCategory: "",
                deleteGarbageName: "",
                subcatagoryNum: null,
                deleteGError: {}
            })
            setshowdeleteform(false)
            setbuttoncard(true)
            setShowGarbageTable(true)
        }
    }

    let buttoncard = (
        <div className={classes.buttoncard}>
            <div className={classes.singlebutton} onClick={() => { setbuttoncard(false); setaddform(true); setShowGarbageTable(false) }}>
                Add Garbage
            </div>
            <div className={classes.singlebutton} style={{width:"200px"}} onClick={() => { setbuttoncard(false); setshoweditform(true); setShowGarbageTable(false) }}>
                Modify Garbage Rate
            </div>
            <div className={classes.singlebutton} onClick={() => { setbuttoncard(false); setshowdeleteform(true); setShowGarbageTable(false) }}>
                Delete Garbage
            </div>
        </div>
    )
    if (!showbuttoncard) {
        buttoncard = null
    }

    let addform = (
        <div className={classes.addform}>
            <h3>Add New Garbage</h3>
            <label style={{ marginTop: "15px" }}><b>Select Category of Garbage</b></label><span>{creategarbage.newGError.cname ? <span style={{ color: "red", marginLeft: "25px" }}>{creategarbage.newGError.cname}</span> : null}</span>
            <select className={classes.catg} value={creategarbage.category} onChange={(e) => { setcg({ ...creategarbage, category: e.target.value }) }}>
                <option value="sc">Select Category</option>
                <option value="Paper" selected>Paper</option>
                <option value="Plastic">Plastic</option>
                <option value="Metal">Metal</option>
                <option value="E-Waste">E-waste</option>
                <option value="Other">Other</option>
            </select>
            <label><b>Name of garbage</b></label><span>{creategarbage.newGError.scname ? <span style={{ color: "red", marginLeft: "25px" }}>{creategarbage.newGError.scname}</span> : null}</span>
            <input type="text" placeholder="Enter garbage name" value={creategarbage.newGarbageName} onChange={(e) => { setcg({ ...creategarbage, newGarbageName: e.target.value }) }} required />
            <label><b>Price of garbage</b></label><span>{creategarbage.newGError.grate ? <span style={{ color: "red", marginLeft: "25px" }}>{creategarbage.newGError.grate}</span> : null}</span>
            <input type="number" placeholder="Enter garbage price" value={creategarbage.newGarbageRate} onChange={(e) => { setcg({ ...creategarbage, newGarbageRate: e.target.value }) }} required />
            <label><b>Select Quantity</b></label><span>{creategarbage.newGError.gqnt ? <span style={{ color: "red", marginLeft: "25px" }}>{creategarbage.newGError.gqnt}</span> : null}</span>
            <select className={classes.catg} value={creategarbage.newGarbageQnt} onChange={(e) => { setcg({ ...creategarbage, newGarbageQnt: e.target.value }) }}>
                <option value="sq">Select Quantity In</option>
                <option value="Kg">Kg</option>
                <option value="piece">Piece</option>
            </select>
            {creategarbage.newGarbageQnt==="piece"?<div>
                <label><b>Default Weight</b></label><span>{creategarbage.newGError.dwgt ? <span style={{ color: "red", marginLeft: "25px" }}>{creategarbage.newGError.dwgt}</span> : null}</span>
                <input type="number" placeholder="Enter default weight in Kg" value={creategarbage.defaultWeight} onChange={(e) => { setcg({ ...creategarbage,defaultWeight: e.target.value }) }} required />
            </div>:null}
            <div style={{ display: "flex" }}>
                <button style={{ backgroundColor: "#f44336" }} onClick={() => {
                    setbuttoncard(true); setaddform(false); setShowGarbageTable(true); setcg({
                        category: "",
                        newGarbageName: "",
                        newGarbageRate: null,
                        newGarbageQnt: "",
                        newGError: {}
                    })
                }}>Cancel</button>
                <button onClick={(e) => onaddgarbage(e)}>Add</button>
            </div>

        </div>
    )
    if (!showaddform) {
        addform = null
    }

    let modifyRateform = (
        <div className={classes.addform}>
            <h3>Modify Garbage Rate</h3>
            <label style={{ marginTop: "15px" }}><b>Select Category of Garbage</b></label><span style={{ color: "red", marginLeft: "25px" }}>{editform.editGError?.cname ? editform.editGError.cname : null}</span>
            <select className={classes.catg} value={editform.editCategory} onChange={(e) => onstatechange(e)}>
                <option value="sc">Select Category</option>
                <option value="Paper">Paper</option>
                <option value="Plastic">Plastic</option>
                <option value="Metal">Metal</option>
                <option value="E-Waste">E-waste</option>
                <option value="Other">Other</option>
            </select>
            <label style={{ marginTop: "15px" }}><b>Select Garbage</b></label><span style={{ color: "red", marginLeft: "25px" }}>{editform.editGError?.scname ? editform.editGError.scname : null}</span>
            <select className={classes.catg} onChange={(e) => seteditform({ ...editform, editGarbageName: e.target.value })}>
                <option value="sg">Select Garbage</option>
                {
                    props.garbage[editform.subcatagoryNum]?.subcatagory.map(sc => {
                        return (
                            <option>{sc.name}</option>
                        )
                    })
                }
            </select>
            <label><b>Price of garbage</b></label><span style={{ color: "red", marginLeft: "25px" }}>{editform.editGError?.grate ? editform.editGError.grate : null}</span>
            <input type="number" placeholder="Enter garbage price" value={editform.editGarbageRate} onChange={(e) => { seteditform({ ...editform, editGarbageRate: e.target.value }) }} required />
            <div style={{ display: "flex" }}>
                <button style={{ backgroundColor: "#f44336" }} onClick={() => {
                    setbuttoncard(true); setshoweditform(false); setShowGarbageTable(true); seteditform({
                        editCategory: "",
                        editGarbageName: "",
                        editGarbageRate: null,
                        subcatagoryNum: null,
                        editGError: {}
                    })
                }}>Cancel</button>
                <button onClick={(e) => oneditgarbage(e)}>Modify</button>
            </div>
        </div>
    )

    if (!showeditform) {
        modifyRateform = null
    }

    let deleteGarbageForm = (
        <div className={classes.addform}>
            <h3>Delete Garbage</h3>
            <label style={{ marginTop: "15px" }}><b>Select Category of Garbage</b></label><span style={{ color: "red", marginLeft: "25px" }}>{deleteform.deleteGError?.cname ? deleteform.deleteGError.cname : null}</span>
            <select className={classes.catg} value={deleteform.deleteCategory} onChange={(e) => ondeletestatechange(e)}>
                <option value="sc">Select Category</option>
                <option value="Paper">Paper</option>
                <option value="Plastic">Plastic</option>
                <option value="Metal">Metal</option>
                <option value="E-Waste">E-waste</option>
                <option value="Other">Other</option>
            </select>
            <label style={{ marginTop: "15px" }}><b>Select Garbage</b></label><span style={{ color: "red", marginLeft: "25px" }}>{deleteform.deleteGError?.scname ? deleteform.deleteGError.scname : null}</span>
            <select className={classes.catg} onChange={(e) => setdeleteform({ ...deleteform, deleteGarbageName: e.target.value })}>
                <option value="sg">Select Garbage</option>
                {
                    props.garbage[deleteform.subcatagoryNum]?.subcatagory.map(sc => {
                        return (
                            <option>{sc.name}</option>
                        )
                    })
                }
            </select>
            <div style={{ display: "flex" }}>
                <button style={{ backgroundColor: "#f44336" }} onClick={() => {
                    setbuttoncard(true); setshowdeleteform(false); setShowGarbageTable(true); setdeleteform({
                        deleteCategory: "",
                        deleteGarbageName: "",
                        subcatagoryNum: null,
                        deleteGError: {}
                    })
                }}>Cancel</button>
                <button onClick={(e) => ondeletegarbage(e)}>Delete</button>
            </div>
        </div>
    )

    if (!showdeleteform) {
        deleteGarbageForm = null
    }

    let garbage = (
        <div>
            <div className={classes.cards}>
                {props.garbage?.map(gar => {
                    return (
                        <div className={classes.card}>
                            <table style={{ border: "none" }}>
                                <tr>
                                    <th colSpan="2" style={{ width: "214px" }}>{gar.category}</th>
                                </tr>

                                {gar.subcatagory.map(g => {
                                    return (
                                        <tr key={g._id}>
                                            <td>{g.name}</td>
                                            <td>&#x20B9; {g.rate}/{g.quntityin}</td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

    if (!showGarbageTable) {
        garbage = null
    }

    return (
        <div className={classes.garbagetabel}>
            {buttoncard}
            {addform}
            {modifyRateform}
            {deleteGarbageForm}
            {garbage}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        garbage: state.Order.garbage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getgarbage: () => dispatch(actions.getgarbage()),
        creategarbage: (garbage) => dispatch(adminaction.creategarbage(garbage)),
        editgarbage: (garbage) => dispatch(adminaction.editgarbage(garbage)),
        deletegarbage: (garbage) => dispatch(adminaction.deletegarbage(garbage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGarbage)