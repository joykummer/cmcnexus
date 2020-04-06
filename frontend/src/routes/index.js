import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {PrivateRoute} from '../components/PrivateRoute';
import UnderConstruction from '../components/UnderConstruction'

export default function Routes() {
    return (
      <Router>
        <Body>
          <Switch>
            <Route path='/' component={UnderConstruction}/>
          </Switch>
        </Body>
      </Router>
    )
}
