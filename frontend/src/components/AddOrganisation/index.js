import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import { addOrganisationFunction } from "../../store/actions/addOrganisationAction";
import { Dropdown } from "../../styles/Dropdowns";
import { categoriesFunction } from "../../store/actions/categoriesAction";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FieldInput = styled(GreyRoundInput)`
  width: 100px;
  height: 30px;
`;

const CategoryDropdown = styled(Dropdown)`
  width: 200px;
  height: auto;
`;

const AddButton = styled(RedButton)`
  width: 75px;
  height: 30px;
`;

const FormEntry = styled.div`
  display: flex;
  flex-direction: row;
`;

function AddOrganisation(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [tag, setTag] = useState("");
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(categoriesFunction());
  }, [dispatch]);

 const categories = [];

  const setCategoryHandler = (e) => {
    const id = e.target.options.selectedIndex;
    const categoryOption = e.target.options;
    if ((categoryOption[id].selected === true) && !(categories.some((category) => category === id)) ) {
        categories.push(id)
    }
    console.log('SETCAT ORG', categories);
  };

  const addOrganisationHandler = async (e) => {
      console.log('IN ORG', categories);
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
        <FormEntry>
      <div>name:</div>
      <FieldInput
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required="required"
      />
        </FormEntry>
      <div>description:</div>
      <FieldInput
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      <div>services:</div>
      <FieldInput
        name="services"
        onChange={(e) => setServices(e.target.value)}
        value={services}
        required
      />
      <FormEntry>
      <div>category:</div>
      <CategoryDropdown defaultValue={[]} onChange={setCategoryHandler} multiple>
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
      </FormEntry>
      <div>tag:</div>
      <FieldInput
        name="tag"
        onChange={(e) => setTag(e.target.value)}
        value={tag}
        required
      />
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
