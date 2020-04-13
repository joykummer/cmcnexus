import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

import dashboard from '../../assets/tachometer-alt-solid.svg'
import folder from '../../assets/folder-open-regular.svg'
import organisation from '../../assets/network-wired-solid.svg'
import msf_logo from '../../assets/MSF_logo_international.jpg'
import {
  NavigationContainer, Logo, Options,
  Button, NavItem
} from './style';
import {logoutAction} from '../../store/actions/loginActions';
import CanI from '../Permissions';
import {Empty} from '../../styles/GenericBoxes';
import {CASES, DASHBOARD, ORGANISATIONS} from '../Navigation/states';
import {setNavigationAction} from '../../store/actions/Navigation';


function NavigationBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selected = useSelector(state => state.navigation);

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push({
      pathname: "/login",
      state: { from: "/" }
    });
  }

  const onClickHandler = navigationTarget => {
    dispatch(setNavigationAction(navigationTarget));
    history.push(`/${navigationTarget}/`);
  }

  return (
    <NavigationContainer>
      <Logo src={msf_logo}/>
      <Options>
        <NavItem selected={selected===DASHBOARD} onClick={() => onClickHandler(DASHBOARD)}>
          <img src={dashboard} alt="Dashboard" style={{paddingRight: 35, height: 45}}/>
          Dashboard
        </NavItem>
        <NavItem selected={selected===CASES} onClick={() => onClickHandler(CASES)}>
          <img src={folder} alt="Cases" style={{paddingRight: 35, height: 45}}/>
          Cases
        </NavItem>
        <NavItem selected={selected===ORGANISATIONS} onClick={() => onClickHandler(ORGANISATIONS)}>
          <img src={organisation} alt="Organisations" style={{paddingRight: 30, height: 45}}/>
          Organisations
        </NavItem>
      </Options>
      <Empty/>
      <Button onClick={logoutHandler}>Log out</Button>
    </NavigationContainer>
  );
}

export default NavigationBar;
