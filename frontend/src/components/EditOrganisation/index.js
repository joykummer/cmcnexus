import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editOrganisationFunction } from "../../store/actions/editOrganisationAction";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { Label } from "../AddOrganisation/styles";
import { AddButton } from "../../styles/Buttons";
import { CategoryDropdown } from "../../styles/Dropdowns";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";
import { FieldInput, FieldInputLarge } from "../../styles/Inputs";


function EditOrganisation(props) {

  const organisationDetails = props.organisations
    ? props.organisations.find(
        (organisation) => organisation.id === Number(props.match.params.id)
      )
    : null;

  const [name, setName] = useState(organisationDetails.name);
  const [description, setDescription] = useState(organisationDetails.description);
  const [services, setServices] = useState(organisationDetails.services);
  const [tag, setTag] = useState(organisationDetails.tag);
  const dispatch = props.dispatch;
  const categories = [];

  useEffect(() => {
    dispatch(categoriesFunction());
  }, [dispatch]);


  const setCategoryHandler = (e) => {
    const id = e.target.options.selectedIndex;
    const categoryOption = e.target.options;
    if ((categoryOption[id].selected === true) && !(categories.some((category) => category === id)) ) {
        categories.push(id)
    }
  };


  const editOrganisationHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      services: services,
    //   categories: categories,
      tag: tag,
    };
    const organisationId = organisationDetails.id;
    await props.dispatch(editOrganisationFunction(data, organisationId));
    props.history.push("/organisations/");
  };

  
  return (
    <Container>
        {organisationDetails ? (
            <>
      <HeaderTitle>Edit organisation</HeaderTitle>
      <DetailsContainer>
        <Label>Name
      <FieldInput
        placeholder ={organisationDetails.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </Label>
      <Label>Description
      <FieldInputLarge
        placeholder ={organisationDetails.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      </Label>
      <Label>Services
      <FieldInputLarge
        placeholder ={organisationDetails.services}
        value={services}
        onChange={(e) => setServices(e.target.value)}
      />
      </Label>
      <Label>Tag
      <FieldInput
        placeholder ={organisationDetails.tag}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      </Label>
      <Label>Category
      <CategoryDropdown onChange={setCategoryHandler} multiple>
         {props.categories
          ? props.categories.map((category) => {
              return (
                <option key={category.id} id={category.id}>
                  {category.name}
                </option>
              );
            })
          : null}
      </CategoryDropdown>
      </Label>
      </DetailsContainer>
      </>
      ) :(
        <div>This organisation does not exist.</div>
      )}
      <AddButton onClick={editOrganisationHandler}>Save</AddButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(EditOrganisation);
