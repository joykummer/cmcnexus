import React, { useEffect, useState } from "react";
import styled from "styled-components";
import countryList from "react-select-country-list";
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
  height: 30px;
`;

const SexDropdown = styled(Dropdown)`
  width: 200px;
  height: 30px;
`;

const CategoryDropdown = styled(Dropdown)`
  width: 200px;
  height: auto;
`;

const AddButton = styled(RedButton)`
  width: 75px;
  height: 30px;
  margin-top: 40px;
`;

const FormEntry = styled.div`
  display: flex;
  flex-direction: row;
`;

const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
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
  const [categories, setCategories] = useState(null);
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
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    const selectOptions = Array.from(e.target.options)
      .filter((el) => el.selected)
      .map((el) => el.id);
    setCategories(selectOptions);
  };

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

  const addCaseHandler = async (e) => {
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
        categories: categories,
      };
      dispatch(addCaseFunction(data));
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
      <ErrorMessage>{titleError}</ErrorMessage>
      <FormEntry>
        <div>description:</div>
        <FieldInput
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </FormEntry>
      <ErrorMessage>{descriptionError}</ErrorMessage>
      <FormEntry>
        <div>diagnosis:</div>
        <FieldInput
          name="diagnosis"
          onChange={(e) => setDiagnosis(e.target.value)}
          value={diagnosis}
          required
        />
      </FormEntry>
      <ErrorMessage>{diagnosisError}</ErrorMessage>
      <FormEntry>
        <div>justification:</div>
        <FieldInput
          name="justification"
          onChange={(e) => setJustification(e.target.value)}
          value={justification}
          required
        />
      </FormEntry>
      <ErrorMessage>{justificationError}</ErrorMessage>
      <FormEntry>
        <div>recommendation:</div>
        <FieldInput
          name="recommendation"
          onChange={(e) => setRecommendation(e.target.value)}
          value={recommendation}
          required
        />
      </FormEntry>
      <ErrorMessage>{recommendationError}</ErrorMessage>
      <FormEntry>
        <div>patient's consent:</div>
        <Checkbox
          type="checkbox"
          name="consent"
          onChange={() => setConsent(true)}
          value="consent"
          required
        />
      </FormEntry>
      <ErrorMessage>{consentError}</ErrorMessage>
      <FormEntry>
        <div>age:</div>
        <FieldInput
          name="age"
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          min="0"
          max="150"
          required
        />
      </FormEntry>
      <ErrorMessage>{ageError}</ErrorMessage>
      <FormEntry>
        <div>sex:</div>
        <SexDropdown
          name="sex"
          onChange={(e) => setSex(e.target.value)}
          value={sex}
          required
        >
          <option value="" disabled>
            Please choose here...
          </option>
          <option key={1}>F</option>
          <option key={2}>M</option>
        </SexDropdown>
      </FormEntry>
      <ErrorMessage>{sexError}</ErrorMessage>
      <FormEntry>
        <div>country:</div>
        <CountryDropdown
          defaultValue={"default"}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="default" disabled>
            Please choose here...
          </option>
          {countries
            ? countries.map((country) => {
                return <option key={country.value}>{country.label}</option>;
              })
            : null}
        </CountryDropdown>
      </FormEntry>
      <ErrorMessage>{countryError}</ErrorMessage>
      <FormEntry>
        <div>category:</div>
        <CategoryDropdown
          defaultValue={[]}
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
      </FormEntry>
        <ErrorMessage>{categoriesError}</ErrorMessage>
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
