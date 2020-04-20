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
import { AddButton } from "../../styles/Buttons/index"

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
      <HeaderTitle>USER PROFILE</HeaderTitle>
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
        <AddButton onClick={onClickHandler}>Edit</AddButton>
    </Container>
  ) : (
    "user not found"
  );
}
