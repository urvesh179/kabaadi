import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './container/SignIn/SignIn'
import Dashboard from './container/Dashboard/Dashboard'
import Header from './components/Header/Header'
import Wallet from './container/Wallet/Wallet'
import ComOrders from './container/ComOrders/ComOrders'
import CompleteOrder from './container/CompleteOrder/CompleteOrder'

class GarbageCollector extends Component {

    render() {
        const gctoken = localStorage.getItem("gctoken")
        let route = <Redirect to='/' />
        if (gctoken !== null) {
            route = (
                <div>
                    <Header />
                    <Switch>
                        <Route path='/gc/dashboard' exact component={Dashboard} />
                        <Route path='/gc/wallet' exact component={Wallet} />
                        <Route path='/gc/comorders' exact component={ComOrders} />
                        <Route path='/gc/completeorder/:id' exact component={CompleteOrder} />
                        <Redirect to='/gc/dashboard' />
                    </Switch>
                </div>
            )
        }
        else {
            route = (
                <Switch>
                    <Route path='/gc' exact component={SignIn} />
                    <Redirect to='/gc' />
                </Switch>
            )
        }

        return (
            <div>
                {route}
            </div>
        )
    }
}

export default GarbageCollector