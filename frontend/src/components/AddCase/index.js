import React, { useEffect, useState } from "react";
import countryList from "react-select-country-list"
import { connect } from "react-redux";
import { categoriesFunction } from "../../store/actions/categoriesAction";
import { addCaseFunction } from "../../store/actions/addCaseAction";
import {setNavigationAction} from '../../store/actions/Navigation';
import {CASES_ADD} from '../Navigation/states';

import {Container, HeaderTitle, DetailsContainer, Label, FieldInput, FieldInputLarge} from "../AddOrganisation/styles";
import {CategoryDropdown, AddButton, Checkbox, CountryDropdown, SexDropdown} from "./styles"


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
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(categoriesFunction());
    dispatch(setNavigationAction(CASES_ADD));
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    console.log(selectedOptions)
    setCategories(selectedOptions.map(option => option.value));
    setCategoryIds(selectedOptions.map(option => option.id));
    console.log()
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
      categories: categoryIds,
    };
    console.log('data', data);
    const response = await dispatch(addCaseFunction(data));
    if (response === undefined) {
        props.history.push("/cases/");
    }
  };

  return (
    <Container>
      <HeaderTitle>Add case</HeaderTitle>
      <DetailsContainer>
        <Label>Title
        <FieldInput
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        </Label>
      <Label>Description
      <FieldInputLarge
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      </Label>
      <Label>Diagnosis
      <FieldInputLarge
        name="diagnosis"
        onChange={(e) => setDiagnosis(e.target.value)}
        value={diagnosis}
        required
      />
      </Label>
      <Label>Justification
      <FieldInputLarge
        name="justification"
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
        required
      />
      </Label>
      <Label>Recommendation
      <FieldInputLarge
        name="recommendation"
        onChange={(e) => setRecommendation(e.target.value)}
        value={recommendation}
        required
      />
      </Label>
      <Label>Patient's consent
      <Checkbox
        type="checkbox"
        name="consent"
        onChange={() => setConsent(true)}
        value="consent"
        required
      />
      </Label>
      <Label>Age
      <FieldInput
        name="age"
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        required
      />
      </Label>
      <Label>Sex
      <SexDropdown
        name="sex"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        required
      >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>F</option>
          <option key={2}>M</option>
      </SexDropdown>
        </Label>
      <Label>Country
      <CountryDropdown defaultValue={"default"} onChange={(e) => setCountry(e.target.value)}>
          <option value="default" disabled>Please choose here...</option>
          {countries
          ? countries.map((country) => {
              return (
                <option key={country.value}>{country.label}</option>
              );
            })
          : null
          }
      </CountryDropdown>
        </Label>
      <Label>Category
      <CategoryDropdown value={categories} defaultValue={"default"} onChange={setCategoryHandler} multiple>
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
