import React from 'react';

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import {PrivateRoute, PrivateRoutePerm} from '../components/PrivateRoute';

import UnderConstruction from '../components/UnderConstruction';
import {Login} from '../components/Login';
import LandingPage from '../components/LandingPage'
import Navigation from '../components/Navigation';
import ListCases from "../components/ListCases";
import AddCase from "../components/AddCase";
import ListOrganisations from '../components/ListOrganisations';
import AddOrganisation from "../components/AddOrganisation";
import {ADD_CASE, ADD_ORGANISATION, VIEW_CASE, VIEW_ORGANISATION} from '../components/Permissions/permissions';



export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/404' component={UnderConstruction}/>

          <Navigation>
              <Route exact path="/" render={() => <Redirect to='/dashboard'/>} />
              <PrivateRoute path='/dashboard/' component={() => <div>Hallo Welt</div>}/>
              <PrivateRoute exact path='/cases/add/' component={AddCase} permission={ADD_CASE}/>
              <PrivateRoute exact path='/cases/' component={ListCases} permission={VIEW_CASE}/>
              <PrivateRoute exact path='/organisations/add/' component={AddOrganisation} permission={ADD_ORGANISATION}/>
              <PrivateRoute exact path='/organisations/' component={ListOrganisations} permission={VIEW_ORGANISATION}/>
              <Route path="/" render={() => <Redirect to='/dashboard'/>} />
          </Navigation>
        </Switch>
      </Router>
    )
}
