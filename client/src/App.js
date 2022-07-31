import React from 'react';
import Admin from './Admin/Admin';
import User from './User/User';
import GarbageCollector from './GarbageCollector/GarbageCollector'
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      <Switch>
        
        <Route path="/admin" component={Admin} />
        <Route path="/gc" component={GarbageCollector} />
        <Route path="/" component={User} />
      </Switch>
    </div>
  )
}

export default App
