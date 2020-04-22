import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import { addOrganisationFunction } from "../../store/actions/Organisations/addOrganisationAction";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import {setNavigationAction} from '../../store/actions/Navigation';
import { ORGANISATIONS } from '../Navigation/states';
import { Label } from "./styles"
import { AddButton } from "../../styles/Buttons";
import { CategoryDropdown } from "../../styles/Dropdowns";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";
import { FieldInput, FieldInputLarge } from "../../styles/Inputs";
import {organisationsFunction} from "../../store/actions/Organisations/organisationsAction";


function AddOrganisation(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [tag, setTag] = useState("");
  const [categories, setCategories] = useState(["default"]);
  const [categoryIds, setCategoryIds] = useState([]);
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


  const addOrganisationHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      description: description,
      services: services,
      categories: categoryIds,
      tag: tag,
    };
    await dispatch(addOrganisationFunction(data));
    // console.log("response", response)
    setLoading(false);
    props.history.push("/organisations/");
  };

  return (
    <Container>
      <HeaderTitle>Add organisation</HeaderTitle>
      <DetailsContainer>
        <Label>Name
      <FieldInput
        name="name"
        type = "text"
        maxLength = "100"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      </Label>
      <Label>Description
      <FieldInputLarge
        name="description"
        type = "textarea"
        rows = '5'
        maxLength = "500"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      </Label>
      <Label>Services
      <FieldInputLarge
        name="services"
        type = "textarea"
        maxLength = "500"
        onChange={(e) => setServices(e.target.value)}
        value={services}
        required
      />
      </Label>
      <Label>Tag
      <FieldInput
        name="tag"
        maxLength = "100"
        onChange={(e) => setTag(e.target.value)}
        value={tag}
        required
      />
      </Label>
      <Label>Category
      <CategoryDropdown
            value={categories}
            onChange={setCategoryHandler}
            multiple
          >
            {/*<option value="default" disabled>Please choose here...</option>*/}
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
      <AddButton onClick={addOrganisationHandler}>{loading ? <ClipLoader size={35} color={"white"}/> :  "SUBMIT"}</AddButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(AddOrganisation);
