import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addOrganisationFunction } from "../../store/actions/addOrganisationAction";
import { categoriesFunction } from "../../store/actions/categoriesAction";
import {setNavigationAction} from '../../store/actions/Navigation';
import {ORGANISATIONS} from '../Navigation/states';
import {Container, HeaderTitle, DetailsContainer, Label, FieldInput,
      FieldInputLarge, CategoryDropdown, AddButton} from "./styles"


function AddOrganisation(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [tag, setTag] = useState("");
  const [categories, setCategories] = useState(["default"]);
  const [categoryIds, setCategoryIds] = useState([]);
  const dispatch = props.dispatch;

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
    const data = {
      name: name,
      description: description,
      services: services,
      categories: categoryIds,
      tag: tag,
    };
    dispatch(addOrganisationFunction(data));
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
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      </Label>
      <Label>Services
      <FieldInputLarge
        name="services"
        type = "textarea"
        onChange={(e) => setServices(e.target.value)}
        value={services}
        required
      />
      </Label>
      <Label>Tag
        <FieldInput
          name="tag"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
          required
        />
      </Label>
      <Label>Category
      <CategoryDropdown value={categories} onChange={setCategoryHandler} multiple>
        <option value={"default"} disabled>Select a category...</option>
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
      <AddButton onClick={addOrganisationHandler}>Add</AddButton>
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
