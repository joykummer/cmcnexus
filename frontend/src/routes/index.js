import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {PrivateRoute} from '../components/PrivateRoute';
import UnderConstruction from '../components/UnderConstruction'
import {Login} from '../components/Login';

export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>

          <Route path='/' component={UnderConstruction}/>
        </Switch>
      </Router>
    )
}
