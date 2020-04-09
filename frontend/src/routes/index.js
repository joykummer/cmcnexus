import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {PrivateRoute} from '../components/PrivateRoute';

import UnderConstruction from '../components/UnderConstruction';
import ListOrganisations from '../components/ListOrganisations';
import {Login} from '../components/Login';
import LandingPage from '../components/LandingPage'


export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={LandingPage}/>
          <Route path='/organisations/' component={ListOrganisations}/>
          <Route path='/login' component={Login}/>
          <Route path='/' component={UnderConstruction}/>
        </Switch>
      </Router>
    )
}
