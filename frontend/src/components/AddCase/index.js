import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import countryList from "react-select-country-list";
import { connect } from "react-redux";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction"
import { addCaseFunction } from "../../store/actions/Cases/addCaseAction";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES_ADD } from "../Navigation/states";
import {
  Container,
  HeaderTitle,
  DetailsContainer,
  Label,
  FieldInput,
  FieldInputLarge,
} from "../AddOrganisation/styles";
import {
  CategoryDropdown,
  AddButton,
  Checkbox,
  CaseDropdown
} from "./styles";

const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;git
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  color: black;
`;

function AddCase(props) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [nature_of_referral, setNatureOfReferral] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [description, setDescription] = useState("");
  const [history_description, setHistoryDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [past_medical_history, setMedicalHistory] = useState("");
  const [physical_examination, setPhysicalExamination] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [current_treatment, setCurrentTreatment] = useState("");
  const [justification, setJustification] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [consent, setConsent] = useState(false);
  const [birth_date, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [location, setLocation] = useState("");
  const countries = countryList().getData();
  const [country, setCountry] = useState("");
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
  const [loading, setLoading] = useState(false)
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(categoriesFunction());
    dispatch(setNavigationAction(CASES_ADD));
  }, [dispatch]);

  const setCategoryHandler = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    setCategories(selectedOptions.map((option) => option.value));
    setCategoryIds(selectedOptions.map((option) => option.id));
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
        consent: consent,
        birth_date: birth_date,
        age: age,
        sex: sex,
        location: location,
        country: country,
        categories: categoryIds,
      };
      await dispatch(addCaseFunction(data));
      setLoading(false);
      props.history.push("/cases/");
    }
  };

  return (
    <Container>
      <HeaderTitle>Add case</HeaderTitle>
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
        <Label>Language
        <CaseDropdown
          name="language"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          required
        >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>French</option>
          <option key={2}>English</option>
          <option key={3}>Spanish</option>
        </CaseDropdown>
        </Label>
        <Label>Nature of referral
        <CaseDropdown
          name="nature_of_referral"
          onChange={(e) => setNatureOfReferral(e.target.value)}
          value={nature_of_referral}
          required
        >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>Life changing</option>
          <option key={2}>Emergency</option>
          <option key={3}>Urgent</option>
        </CaseDropdown>
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
      <Label>History of Presenting Complaint
      <FieldInputLarge
        name="history_description"
        onChange={(e) => setHistoryDescription(e.target.value)}
        value={history_description}
        required
      />
           <ErrorMessage>{descriptionError}</ErrorMessage>
      </Label>
      <Label>Diagnosis
      <FieldInputLarge
        name="diagnosis"
        onChange={(e) => setDiagnosis(e.target.value)}
        value={diagnosis}
        required
      />
      </Label>
      <ErrorMessage>{diagnosisError}</ErrorMessage>
      <Label>Past medical history
      <FieldInputLarge
        name="past_medical_history"
        onChange={(e) => setMedicalHistory(e.target.value)}
        value={past_medical_history}
        required
      />
      </Label>
      <Label>Physical examination
      <FieldInputLarge
        name="physical_examination"
        onChange={(e) => setPhysicalExamination(e.target.value)}
        value={physical_examination}
        required
      />
      </Label>
      <Label>Investigations
      <FieldInputLarge
        name="investigations"
        onChange={(e) => setInvestigations(e.target.value)}
        value={investigations}
        required
      />
      </Label>
      <Label>Current treatment
      <FieldInputLarge
        name="current_treatment"
        onChange={(e) => setCurrentTreatment(e.target.value)}
        value={current_treatment}
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
          <ErrorMessage>{justificationError}</ErrorMessage>
      </Label>
      <Label>Recommendation
      <FieldInputLarge
        name="recommendation"
        onChange={(e) => setRecommendation(e.target.value)}
        value={recommendation}
        required
      />
        <ErrorMessage>{recommendationError}</ErrorMessage>
      </Label>
      <Label>Patient's consent
          <Wrapper>
            <Checkbox
              type="checkbox"
              name="consent"
              onChange={() => setConsent(true)}
              value="consent"
              required
            />
            <Text>
              By ticking this box, I confirm that informed consent has been
              obtained from the patient.
            </Text>
          </Wrapper>
          <ErrorMessage>{consentError}</ErrorMessage>
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
        required
      />
      </Label>
          <ErrorMessage>{ageError}</ErrorMessage>
      <Label>Sex
      <CaseDropdown
        name="sex"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        required
      >
          <option value="" disabled>Please choose here...</option>
          <option key={1}>F</option>
          <option key={2}>M</option>
      </CaseDropdown>
      </Label>
      <ErrorMessage>{sexError}</ErrorMessage>
      <Label>Location
      <FieldInput
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          required
      />
      </Label>
      <Label>Country
      <CaseDropdown defaultValue={"default"} onChange={(e) => setCountry(e.target.value)}>
          <option value="default" disabled>Please choose here...</option>
          {countries
          ? countries.map((country) => {
              return (
                <option key={country.value}>{country.label}</option>
              );
            })
          : null
          }
      </CaseDropdown>
      <ErrorMessage>{countryError}</ErrorMessage>
        </Label>
        <Label>
          Category
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

          <ErrorMessage>{categoriesError}</ErrorMessage>
      </DetailsContainer>
      <AddButton onClick={addCaseHandler}>{loading ? <ClipLoader size={35} color={"white"} height={15}/> :  "SUBMIT"}</AddButton>
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
