import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {PrivateRoute} from '../components/PrivateRoute';

import UnderConstruction from '../components/UnderConstruction';
import ListOrganisations from '../components/ListOrganisations';
import {Login} from '../components/Login';
import NavigationBar from '../components/NavigationBar'

export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route path='/organisations/' component={ListOrganisations}/>
          <Route path='/login' component={Login}/>
          <Route path='/nav' component={NavigationBar}/>
          <Route path='/' component={UnderConstruction}/>
        </Switch>
      </Router>
    )
}
