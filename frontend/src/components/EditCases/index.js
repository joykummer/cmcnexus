import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import countryList from "react-select-country-list";
import { connect } from "react-redux";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { editCaseFunction } from "../../store/actions/Cases/editCaseAction";
import {setNavigationAction} from '../../store/actions/Navigation';
import {CASES_ADD} from '../Navigation/states';
import {EditSaveButton} from "../../styles/Buttons/index"
import {Label} from "../AddOrganisation/styles";
import { CategoryDropdown, BasicDropdown } from "../../styles/Dropdowns";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";
import { FieldInput, FieldInputLarge } from "../../styles/Inputs";

const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-top: 2px;
  margin-right: 10px;
`;

const Text = styled.div`
  color: black;
`;

function EditCases(props) {
  const caseDetails =
    props.cases ?
    (props.cases.find(file => (file.id === Number(props.match.params.id))))
    : null;
    
  const [title, setTitle] = useState(caseDetails.title);
  const [language, setLanguage] = useState(caseDetails.language);
  const [nature_of_referral, setNatureOfReferral] = useState(caseDetails.nature_of_referral);
  const [patient_id, setPatientId] = useState(caseDetails.patient_id);
  const [description, setDescription] = useState(caseDetails.description);
  const [history_description, setHistoryDescription] = useState(caseDetails.history_description);
  const [diagnosis, setDiagnosis] = useState(caseDetails.diagnosis);
  const [past_medical_history, setMedicalHistory] = useState(caseDetails.past_medical_history);
  const [physical_examination, setPhysicalExamination] = useState(caseDetails.physical_examination);
  const [investigations, setInvestigations] = useState(caseDetails.investigations);
  const [current_treatment, setCurrentTreatment] = useState(caseDetails.current_treatment);
  const [justification, setJustification] = useState(caseDetails.justification);
  const [recommendation, setRecommendation] = useState(caseDetails.recommendation);
  const [birth_date, setBirthDate] = useState(caseDetails.birth_date);
  const [age, setAge] = useState(caseDetails.age);
  const [sex, setSex] = useState(caseDetails.sex);
  const [location, setLocation] = useState(caseDetails.location);
  const countries = countryList().getData();
  const [country, setCountry] = useState(caseDetails.country);
  const [categories, setCategories] = useState(caseDetails.categories.map(category => category.name));
  const [categoryIds, setCategoryIds] = useState(props.categories.id);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [sexError, setSexError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const validate = () => {
    let titleError = "";
    let descriptionError = "";
    let sexError = "";
    let countryError = "";
    let categoriesError = "";

    if (!title) {
      titleError = "Title cannot be blank";
    }
    if (!description) {
      descriptionError = "Description cannot be blank";
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
      ageError ||
      sexError ||
      countryError ||
      categoriesError
    ) {
      setTitleError(titleError);
      setDescriptionError(descriptionError);
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
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      const data = {
        title: title,
        language: language,
        nature_of_referral: nature_of_referral,
        patient_id: patient_id,
        description: description,
        history_description: history_description,
        diagnosis: diagnosis,
        past_medical_history: past_medical_history,
        physical_examination: physical_examination,
        investigations: investigations,
        current_treatment: current_treatment,
        justification: justification,
        recommendation: recommendation,
        birth_date: birth_date,
        age: age,
        sex: sex,
        location: location,
        country: country,
        categories: categoryIds,
      };
      const caseId = caseDetails.id;
      await dispatch(editCaseFunction(data, caseId));
      props.history.push("/cases/");
    }
    setLoading(false);
  };


  return (
    <Container>
      <HeaderTitle>Edit case</HeaderTitle>
      <DetailsContainer>
        <Label>
          Title
          <FieldInput
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <ErrorMessage>{titleError}</ErrorMessage>
        </Label>
        <Label>Language
        <BasicDropdown
          name="language"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          required
        >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>French</option>
          <option key={2}>English</option>
          <option key={3}>Spanish</option>
        </BasicDropdown>
        </Label>
        <Label>Nature of Referral
        <BasicDropdown
          name="nature_of_referral"
          onChange={(e) => setNatureOfReferral(e.target.value)}
          value={nature_of_referral}
          required
        >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>Life changing</option>
          <option key={2}>Emergency</option>
          <option key={3}>Urgent</option>
        </BasicDropdown>
        </Label>
        <Label>Patient ID
        <FieldInput
          name="patient_id"
          type="number"
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}
          min="0"
          required
      />
      </Label>
      <Label>Presenting Complaint
      <FieldInputLarge
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
      />
      </Label>
      <ErrorMessage>{descriptionError}</ErrorMessage>
      <Label>History of Presenting Complaint
      <FieldInputLarge
        name="history_description"
        onChange={(e) => setHistoryDescription(e.target.value)}
        value={history_description}
      />
      </Label>
      <Label>Diagnosis
      <FieldInputLarge
        name="diagnosis"
        onChange={(e) => setDiagnosis(e.target.value)}
        value={diagnosis}
      />
      </Label>
      <Label>Past medical history
      <FieldInputLarge
        name="past_medical_history"
        onChange={(e) => setMedicalHistory(e.target.value)}
        value={past_medical_history}
      />
      </Label>
      <Label>Physical examination
      <FieldInputLarge
        name="physical_examination"
        onChange={(e) => setPhysicalExamination(e.target.value)}
        value={physical_examination}
      />
      </Label>
      <Label>Investigations
      <FieldInputLarge
        name="investigations"
        onChange={(e) => setInvestigations(e.target.value)}
        value={investigations}
      />
      </Label>
      <Label>Current treatment
      <FieldInputLarge
        name="current_treatment"
        onChange={(e) => setCurrentTreatment(e.target.value)}
        value={current_treatment}
      />
      </Label>
      <Label>Justification
      <FieldInputLarge
        name="justification"
        onChange={(e) => setJustification(e.target.value)}
        value={justification}
      />
      </Label>
      <Label>Recommendation
      <FieldInputLarge
        name="recommendation"
        onChange={(e) => setRecommendation(e.target.value)}
        value={recommendation}
      />
      </Label>
      <Label>Birth date
      <FieldInput
        name="birth_date"
        type="text"
        onChange={(e) => setBirthDate(e.target.value)}
        value={birth_date}
      />
      </Label>
      <Label>Age
      <FieldInput
        name="age"
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        min="0"
      />
      </Label>
          <ErrorMessage>{ageError}</ErrorMessage>
      <Label>Sex
      <BasicDropdown
        name="sex"
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
      <Label>Location
      <FieldInput
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
      />
      </Label>
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
      <ErrorMessage>{countryError}</ErrorMessage>
        </Label>
      <Label>Category
      <CategoryDropdown value={categories} onChange={setCategoryHandler} multiple>
        {props.categories
          ? props.categories.filter((c) => c.id !== 0).map((category) => {
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
      <EditSaveButton onClick={editCaseHandler}>{loading ? <ClipLoader size={35} color={"white"} /> :  "SUBMIT"}</EditSaveButton>
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
