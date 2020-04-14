import React, { Component } from 'react'
import {casesFunction} from '../../store/actions/casesAction'
import { connect } from "react-redux";
import { RedButton } from '../../styles/Buttons';
import styled from 'styled-components';
import {updateCaseFunction} from '../../store/actions/updateCaseAction'

const Button = styled(RedButton)`
 height: 50px;
 width: 100px;    
`


class Validation extends Component {

    acceptHandler = async() => {
        console.log("in the accepthandler")
        await this.props.dispatch(updateCaseFunction())
    }

    recetHandler = async() => {
        console.log("in the rejecthandler")
    }

    render() {
        return (
            <div>
                <Button onClick={this.acceptHandler}>Accept</Button> 
                <Button onClick ={this.recetHandler}>Reject</Button> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cases: state.cases,
    };
  };
  
  export default connect(mapStateToProps)(Validation);
