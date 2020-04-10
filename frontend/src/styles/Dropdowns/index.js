import styled from "styled-components";
import arrow from "../../assets/arrow.svg";

export const Dropdown = styled.select`
    font-size: 14px;
    border-radius: 3px;
    border: solid 1px #ebebeb;
    text-align: left;
    outline: none;
    margin-top: 7px;
    background-color: white;
    background: url(${arrow}) ;
    background-position: 95% 50%;
    background-repeat: no-repeat;
    -webkit-appearance: none;
    text-indent: 15px;
    text-overflow: '';
        :focus {
            outline:none;
        }
`;
