import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addOrganisationFunction } from "../../store/actions/addOrganisationAction";
import { categoriesFunction } from "../../store/actions/categoriesAction";
import {Container, HeaderTitle, DetailsContainer, Label, FieldInput,
      FieldInputLarge, CategoryDropdown, AddButton} from "./styles"


function AddOrganisation(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [categories, setCategories] = useState(null);
  const [tag, setTag] = useState("");
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(categoriesFunction());
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    const selectOptions = Array.from(e.target.options)
      .filter((el) => el.selected)
      .map((el) => el.id);
    setCategories(selectOptions);
  };


  const addOrganisationHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      services: services,
      categories: categories,
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
      {/* <Label>Members
      <FieldInput
        name="members"
        onChange={(e) => setMembers(e.target.value)}
        value={members}
        required
      />
      </Label>  */}
      <Label>Category
      <CategoryDropdown defaultValue={"default"} onChange={setCategoryHandler} multiple>
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
