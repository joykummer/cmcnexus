import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {PrivateRoute} from '../components/PrivateRoute';

import UnderConstruction from '../components/UnderConstruction';
import ListOrganisations from '../components/ListOrganisations';
import {Login} from '../components/Login';
import AddOrganisation from "../components/AddOrganisation";


export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route path='/organisations/add/' component={AddOrganisation}/>
          <Route path='/organisations/' component={ListOrganisations}/>
          <Route path='/login' component={Login}/>
          <Route path='/' component={UnderConstruction}/>
        </Switch>
      </Router>
    )
}
