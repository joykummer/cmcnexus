import React, { Component } from 'react'
import { connect } from "react-redux";
import { RedButton } from '../../styles/Buttons';
import styled from 'styled-components';
import {validateCaseFunction} from '../../store/actions/updateCaseAction';
import {rejectCaseFunction} from '../../store/actions/rejectCaseAction';


const Button = styled(RedButton)`
 height: 50px;
 width: 100px;    
`


class Validation extends Component {

    acceptHandler = async() => {
        await this.props.dispatch(validateCaseFunction(this.props.id))
    }

    rejectHandler = async() => {
        await this.props.dispatch(rejectCaseFunction(this.props.id))
    }

    render() {
        return (
            <div>
                <Button onClick={this.acceptHandler}>Accept</Button> 
                <Button onClick ={this.rejectHandler}>Reject</Button> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cases: state.cases
    };
  };
  
  export default connect(mapStateToProps)(Validation);
