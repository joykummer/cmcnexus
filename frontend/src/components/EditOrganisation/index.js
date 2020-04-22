import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import { editOrganisationFunction } from "../../store/actions/Organisations/editOrganisationAction";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { Label } from "../AddOrganisation/styles";
import { ORGANISATIONS } from '../Navigation/states';
import {setNavigationAction} from '../../store/actions/Navigation';
import { EditSaveButton } from "../../styles/Buttons";
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
    const [categories, setCategories] = useState(organisationDetails.categories.map(category => category.name));
    const [categoryIds, setCategoryIds] = useState(props.categories.id);
    const dispatch = props.dispatch;
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      dispatch(categoriesFunction());
      dispatch(setNavigationAction(ORGANISATIONS));
    }, [dispatch]);
  
    const setCategoryHandler = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions);
      setCategories(selectedOptions.map(option => option.value));
      setCategoryIds(selectedOptions.map(option => option.id));
    };  

  const editOrganisationHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      name: name,
      description: description,
      services: services,
      categories: categoryIds,
      tag: tag,
    };
    const organisationId = organisationDetails.id;
    await dispatch(editOrganisationFunction(data, organisationId));
    setLoading(false)
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
      <CategoryDropdown
            value={categories}
            onChange={setCategoryHandler}
            multiple
          >
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
      <EditSaveButton onClick={editOrganisationHandler}>{loading ? <ClipLoader size={35} color={"white"}/> : "SAVE"}</EditSaveButton>
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
