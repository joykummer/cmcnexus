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
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState("");
  const [members, setMembers] = useState("");
  const dispatch = props.dispatch;

  
  // const isEnabled = name.length > 0 && description.length > 0 && services.length > 0 

  useEffect(() => {
    dispatch(categoriesFunction());
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    if (e.target.value === "Undefined") {
      setCategory(0);
    } else if (e.target.value === "Medical") {
      setCategory(1);
    } else if (e.target.value === "Administrative") {
      setCategory(2);
    } else setCategory(3);
  };

  const addOrganisationHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      services: services,
      category: category,
      tag: tag,
      members: members,
    };
    await props.dispatch(addOrganisationFunction(data));
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
      <Label>Members
      <FieldInput
        name="members"
        onChange={(e) => setMembers(e.target.value)}
        value={members}
        required
      />
      </Label>
      <Label>Category
      <CategoryDropdown defaultValue={"default"} onChange={setCategoryHandler}>
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
