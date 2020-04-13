import React from "react";
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

import dashboard from '../../assets/tachometer-alt-solid.svg'
import folder from '../../assets/folder-open-regular.svg'
import organisation from '../../assets/network-wired-solid.svg'
import msf_logo from '../../assets/msf_logo.svg'
import {
  NavigationContainer, Logo, Name, Options, 
  Button, NavItem
} from './style';
import {logoutAction} from '../../store/actions/loginActions';
import CanI from '../Permissions';


function NavigationBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push({
      pathname: "/login",
      state: { from: "/" }
    });
  }

  return (
        <NavigationContainer>
          <Logo src ={msf_logo}/>
          <Name>Name Placeholder</Name>
          <Options>
              <NavItem onClick={() => history.push("/dashboard/")}>
                <img src={dashboard} alt="Dashboard" style={{paddingRight:35, height:45}}/>
                Dashboard
              </NavItem>
              <NavItem onClick={() => history.push("/cases/")}>
                <img src={folder} alt="Cases" style={{paddingRight:35, height: 45}}/>
                Cases
              </NavItem>
              <NavItem onClick={() => history.push("/organisations/")}>
                <img src={organisation} alt="Organisations" style={{paddingRight:30, height: 45}}/>
                Organisations
              </NavItem>
          </Options>
           <Button onClick={logoutHandler}>Log out</Button>
        </NavigationContainer>
  )
}

export default NavigationBar;
