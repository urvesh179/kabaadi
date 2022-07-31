import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import SignIn from './containers/SignIn/SignIn'
import Header from './components/Header/Header'
import Dashboard from './containers/Dashboard/Dashboard'
import GCDetails from './containers/GCDetails/GCDetails'
import Wallet from './containers/Wallet/Wallet'
import AddGarbage from './containers/AddGarbage/AddGarbage'
import classes from './Admin.css'

const Admin = (props) => {
    const token = localStorage.getItem("admin")
    let route = <Redirect to='/' />
    if (token !== null) {
        route = (
            <div>
                <Header />
                <div className={classes.container}>
                    <Switch>
                        <Route path='/admin/dashboard' exact component={Dashboard} />
                        <Route path='/admin/gcdetails' exact component={GCDetails} />
                        <Route path='/admin/wallet' exact component={Wallet} />
                        <Route path='/admin/addgarbage' exact component={AddGarbage} />
                        <Redirect to='/admin/dashboard' />
                    </Switch>
                </div>
            </div>
        )
    }
    else {
        route = (
            <Switch>
                <Route path='/admin' exact component={SignIn} />
                <Redirect to='/admin' />
            </Switch>
        )
    }
    return (
        <div>
            {route}
        </div>
    )
}

export default Admin