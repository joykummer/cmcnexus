import React, { useEffect } from "react";
import Time from "react-time";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setNavigationAction } from "../../store/actions/Navigation";
import { USERPROFILE } from "../Navigation/states";
import {
  Container,
  DetailsContainer,
  HeaderTitle,
} from "../../styles/BaseContainer";
import { DetailsKey, DetailsHeader } from "../../styles/Details";
import styled from "styled-components";
import {RedAddText} from "../../styles/Buttons";

const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

export default function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

	const history = useHistory();

  useEffect(() => {
    dispatch(setNavigationAction(USERPROFILE));
  }, [dispatch]);

  const onClickHandler = () => {
    history.push(`/profile/edit/`);
  };

  return user ? (
    <Container>
      <HeaderTitleWrapper>
        <HeaderTitle>USER PROFILE</HeaderTitle>
        <RedAddText onClick={onClickHandler}>✎ Edit</RedAddText>
      </HeaderTitleWrapper>
      <DetailsContainer>
        <DetailsHeader>
          <DetailsKey>First Name</DetailsKey>
          {user.first_name}
        </DetailsHeader>
        <DetailsHeader>
          <DetailsKey>Last Name</DetailsKey>
          {user.last_name}
        </DetailsHeader>
        <DetailsHeader>
          <DetailsKey>Phone</DetailsKey>
          {user.phone}
        </DetailsHeader>
        <DetailsHeader>
          <DetailsKey>Organisation</DetailsKey>
          {user.organisation ? user.organisation.name : null}
        </DetailsHeader>
        <DetailsHeader>
          <DetailsKey>Department</DetailsKey>
          {user.department}
        </DetailsHeader>
        <DetailsHeader>
          <DetailsKey>Created</DetailsKey>
            <Time value={user.date_joined ? user.date_joined : ""} format="DD/MM/YYYY" />
        </DetailsHeader>
      </DetailsContainer>
    </Container>
  ) : (
    "user not found"
  );
}
