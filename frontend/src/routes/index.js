import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {PrivateRoute} from '../components/PrivateRoute';

import UnderConstruction from '../components/UnderConstruction';
import ListOrganisations from '../components/ListOrganisations';
import {Login} from '../components/Login';
import AddOrganisation from "../components/AddOrganisation";
import LandingPage from '../components/LandingPage'
import Navigation from '../components/Navigation';



export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Navigation>
            <PrivateRoute path='/' exact component={LandingPage}/>
            <PrivateRoute exact path='/organisations/add/' component={AddOrganisation}/>
            <PrivateRoute exact path='/organisations/' component={ListOrganisations}/>
          </Navigation>
          <Route path='/' component={UnderConstruction}/>
        </Switch>
      </Router>
    )
}
