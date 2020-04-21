import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import countryList from "react-select-country-list";
import { connect } from "react-redux";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { editCaseFunction } from "../../store/actions/Cases/editCaseAction";
import {setNavigationAction} from '../../store/actions/Navigation';
import {CASES_ADD} from '../Navigation/states';
import {AddButton, EditSaveButton} from "../../styles/Buttons/index"
import {Label} from "../AddOrganisation/styles";
import { CategoryDropdown, BasicDropdown } from "../../styles/Dropdowns";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";
import { FieldInput, FieldInputLarge } from "../../styles/Inputs";

const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-top: 2px;
  margin-right: 10px;
`;

function EditCases(props) {
  const caseDetails =
    props.cases ?
    (props.cases.find(file => (file.id === Number(props.match.params.id))))
    : null;
    
  const [title, setTitle] = useState(caseDetails.title);
  const [description, setDescription] = useState(caseDetails.description);
  const [diagnosis, setDiagnosis] = useState(caseDetails.diagnosis);
  const [justification, setJustification] = useState(caseDetails.justification);
  const [recommendation, setRecommendation] = useState(caseDetails.recommendation);
  const [consent, setConsent] = useState(caseDetails.consent);
  const [age, setAge] = useState(caseDetails.age);
  const [sex, setSex] = useState(caseDetails.sex);
  const countries = countryList().getData();
  const [country, setCountry] = useState(caseDetails.country);
  const [categories, setCategories] = useState(["default"]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [diagnosisError, setDiagnosisError] = useState("");
  const [justificationError, setJustificationError] = useState("");
  const [recommendationError, setRecommendationError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [sexError, setSexError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(categoriesFunction());
    dispatch(setNavigationAction(CASES_ADD));
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    setCategories(selectedOptions.map(option => option.value));
    setCategoryIds(selectedOptions.map(option => option.id));
  };

  // const consentChecker =(e) => {
  //   if (e.target.ckecked){
  //     setConsent(true)
  //   }else{
  //     setConsent(false)
  //   }
  // console.log("hello it is the checker", e.target.checked)
  // }

  const validate = () => {
    let titleError = "";
    let descriptionError = "";
    let diagnosisError = "";
    let justificationError = "";
    let recommendationError = "";
    let consentError = "";
    let ageError = "";
    let sexError = "";
    let countryError = "";
    let categoriesError = "";

    if (!title) {
      titleError = "Title cannot be blank";
    }
    if (!description) {
      descriptionError = "Description cannot be blank";
    }
    if (!diagnosis) {
      diagnosisError = "Diagnosis cannot be blank";
    }
    if (!justification) {
      justificationError = "Justification cannot be blank";
    }
    if (!recommendation) {
      recommendationError = "Recommendation cannot be blank";
    }
    if (!consent) {
      consentError = "The patient must consent";
    }
    if (!age) {
      ageError = "Age must be disclosed";
    }
    if (!sex) {
      sexError = "Sex must be disclosed";
    }
    if (!country) {
      countryError = "A country must be selected";
    }
    if (!categories) {
      categoriesError = "At least one category must be chosen";
    }

    if (
      titleError ||
      descriptionError ||
      diagnosisError ||
      justificationError ||
      recommendationError ||
      consentError ||
      ageError ||
      sexError ||
      countryError ||
      categoriesError
    ) {
      setTitleError(titleError);
      setDescriptionError(descriptionError);
      setDiagnosisError(diagnosisError);
      setJustificationError(justificationError);
      setRecommendationError(recommendationError);
      setConsentError(consentError);
      setAgeError(ageError);
      setSexError(sexError);
      setCountryError(countryError);
      setCategoriesError(categoriesError);
      return false;
    }
    return true;
  };

  const editCaseHandler = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
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
      const caseId = caseDetails.id
      dispatch(editCaseFunction(data, caseId));
      props.history.push("/cases/");
    }
  };

  // const checkHandler = (e) => {
  //  return caseDetails.consent ? consent.checked : !consent.checked
  // }

  return (
    <Container>
      <HeaderTitle>Edit case</HeaderTitle>
      <DetailsContainer>
        <Label>Title
        <FieldInput
          name="title"
          placeholder ={caseDetails.title}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        </Label>
          <ErrorMessage>{titleError}</ErrorMessage>
      <Label>Description
      <FieldInputLarge
        name="description"
        placeholder ={caseDetails.description}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      </Label>
           <ErrorMessage>{descriptionError}</ErrorMessage>
      <Label>Diagnosis
      <FieldInputLarge
        name="diagnosis"
        placeholder ={caseDetails.diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        value={diagnosis}
        required
      />
      </Label>
          <ErrorMessage>{diagnosisError}</ErrorMessage>
      <Label>Justification
      <FieldInputLarge
        name="justification"
        placeholder ={caseDetails.justification}
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
        required
      />
      </Label>
          <ErrorMessage>{justificationError}</ErrorMessage>
      <Label>Recommendation
      <FieldInputLarge
        name="recommendation"
        placeholder ={caseDetails.recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        value={recommendation}
        required
      />
      </Label>
          <ErrorMessage>{recommendationError}</ErrorMessage>
      <Label>Patient's consent
      <Checkbox
        type="checkbox"
        placeholder ={caseDetails.consent}
        name="consent"
        value="checked"
        required
        checked ={consent}
      />
      </Label>
          <ErrorMessage>{consentError}</ErrorMessage>
      <Label>Age
      <FieldInput
        name="age"
        placeholder ={caseDetails.age}
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        min="0"
        required
      />
      </Label>
          <ErrorMessage>{ageError}</ErrorMessage>
      <Label>Sex
      <BasicDropdown
        name="sex"
        placeholder ={caseDetails.sex}
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        required
      >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>F</option>
          <option key={2}>M</option>
      </BasicDropdown>
        </Label>
          <ErrorMessage>{sexError}</ErrorMessage>
      <Label>Country
      <BasicDropdown defaultValue={"default"} onChange={(e) => setCountry(e.target.value)}>
          <option value="default" disabled>Please choose here...</option>
          {countries
          ? countries.map((country) => {
              return (
                <option key={country.value}>{country.label}</option>
              );
            })
          : null
          }
      </BasicDropdown>
        </Label>
          <ErrorMessage>{countryError}</ErrorMessage>
      <Label>Category
      <CategoryDropdown value={categories} onChange={setCategoryHandler} multiple>
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
          <ErrorMessage>{categoriesError}</ErrorMessage>
        </DetailsContainer>
      <EditSaveButton onClick={editCaseHandler}>SAVE</EditSaveButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(EditCases);
