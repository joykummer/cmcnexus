import React, { Component } from 'react'
import { connect } from "react-redux";
import { RedButton } from '../../styles/Buttons';
import styled from 'styled-components';
import {validateCaseFunction} from '../../store/actions/Cases/updateCaseAction';
import {rejectCaseFunction} from '../../store/actions/Cases/rejectCaseAction';


const ButtonContainer = styled.div`
width: 225px;
display: flex;
justify-content: space-between; 
`;

export const AcceptRejectButton = styled(RedButton)`
 height: 40px;
 width: 100px;  
`;


class Validation extends Component {

    acceptHandler = async(e) => {
        e.preventDefault();
        this.props.dispatch(validateCaseFunction(this.props.id))
    };

    rejectHandler = async(e) => {
        e.preventDefault();
        this.props.dispatch(rejectCaseFunction(this.props.id))
    };

    render() {
        return (
            <ButtonContainer>
                <AcceptRejectButton onClick={this.acceptHandler}>Accept</AcceptRejectButton>
                <AcceptRejectButton onClick ={this.rejectHandler}>Reject</AcceptRejectButton>
            </ButtonContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cases: state.cases
    };
  };
  
  export default connect(mapStateToProps)(Validation);
