import React, {useState} from "react";
import GrayBackground from "../GrayBackground";
import styled from "styled-components";
import {RedButton} from "../../styles/Buttons";
import {BasicDropdown} from "../../styles/Dropdowns";
import {CardBox} from "../../styles/GenericBoxes";
import {useSelector} from "react-redux";

export const RedText = styled.div`
  font-size: 14px;
  color: red;
`;

const Vertical = styled(CardBox)`
position: relative;
display: flex;
flex-direction: column;

padding: 20px;
`;

const CloseDropdown = styled(BasicDropdown)`
margin-bottom: 20px;
`;

const BottomMargin = styled.div`
margin-bottom: 20px;
`;

const CloseIcon = styled.div`
align-self: flex-end;
position: absolute;
right: -20px;
top: 0px;
cursor: pointer;
`;

export default function({closeFunction, closeCase}) {
    const [closeReason, setCloseReason] = useState('default');
    const [showError, setShowError] = useState(false);
    const closingReasons = useSelector(state => state.closingReasons)

    const closeHandler = () => {
        if (closeReason === 'default') {
            setShowError(true);
        }
        closeCase(closeReason);
        closeFunction();
    };

    const selectHandler = e => {
        setCloseReason(e.target.value);
        setShowError(false);
    };

    return (
        <GrayBackground closeFunction={closeFunction}>
            <Vertical>
                <CloseIcon onClick={closeFunction}>✖</CloseIcon>
                <BottomMargin>Select the reason for closing the case.</BottomMargin>
                {showError ? <RedText>Please select a valid choice.</RedText> : null}
                <CloseDropdown value={closeReason} onChange={selectHandler}>
                    <option value={"default"} disabled>--Select--</option>
                    {closingReasons ? closingReasons.map(
                        rsn => <option key={rsn.id} value={rsn.id}>{rsn.name}</option>) : null}
                </CloseDropdown>
                <RedButton onClick={closeHandler}>Close case</RedButton>
            </Vertical>
        </GrayBackground>
    )
}