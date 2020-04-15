import React, { useEffect, useState } from "react";
import styled from "styled-components";
import countryList from "react-select-country-list"
import { connect } from "react-redux";
import { categoriesFunction } from "../../store/actions/categoriesAction";
import { addCaseFunction } from "../../store/actions/addCaseAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import { Dropdown } from "../../styles/Dropdowns";

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

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
`;

const CountryDropdown = styled(Dropdown)`
  width: 200px;
  height: 40px;
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

const Label = styled.div``;

function AddCase(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [justification, setJustification] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [consent, setConsent] = useState(false);
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const countries = countryList().getData();
  const [country, setCountry] = useState("");
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
  };

  const addCaseHandler = async (e) => {
    const data = {
      title: title,
      description: description,
      diagnosis: diagnosis,
      justification: justification,
      recommendation: recommendation,
      consent: consent,
      age: age,
      sex: sex,
      country: country,
      category: categories,
    };
    console.log('data', data);
    const response = await dispatch(addCaseFunction(data));
    if (response === undefined) {
        props.history.push("/cases/");
    }
  };

  return (
    <Container>
      <FormEntry>
        <Label>title:</Label>
        <FieldInput
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </FormEntry>
      <div>description:</div>
      <FieldInput
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      <div>diagnosis:</div>
      <FieldInput
        name="diagnosis"
        onChange={(e) => setDiagnosis(e.target.value)}
        value={diagnosis}
        required
      />
      <div>justification:</div>
      <FieldInput
        name="justification"
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
        required
      />
      <div>recommendation:</div>
      <FieldInput
        name="recommendation"
        onChange={(e) => setRecommendation(e.target.value)}
        value={recommendation}
        required
      />
      <div>patient's consent:</div>
      <Checkbox
        type="checkbox"
        name="consent"
        onChange={() => setConsent(true)}
        value="consent"
        required
      />
      <div>age:</div>
      <FieldInput
        name="age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        required
      />
      <div>sex:</div>
      <FieldInput
        name="sex"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        required
      />
      <div>country:</div>
      <CountryDropdown onChange={(e) => setCountry(e.target.value)}>
        {countries
          ? countries.map((country) => {
              return (
                <option key={country.value}>
                  {country.label}
                </option>
              );
            })
          : null}
      </CountryDropdown>
      <div>category:</div>
      <CategoryDropdown onChange={setCategoryHandler} multiple={true}>
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
      <AddButton onClick={addCaseHandler}>Add</AddButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
    categories: state.categories,

  };
};

export default connect(mapStateToProps)(AddCase);
