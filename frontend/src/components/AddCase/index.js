import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import {addOrganisationFunction} from "../../store/actions/addOrganisationAction";
import {Dropdown} from "../../styles/Dropdowns";
import {categoriesFunction} from "../../store/actions/categoriesAction";
import {addCaseFunction} from "../../store/actions/addCaseAction";


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
    height: 30px;
`;

const AddButton = styled(RedButton)`
  width: 75px;
  height: 30px;
`;


function AddCase(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [justification, setJustification] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [category, setCategory] = useState(null);

    useEffect(() => {
        props.dispatch(categoriesFunction());
    }, []);

    const setTitleHandler = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const setDescriptionHandler = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };

    const setDiagnosisHandler = (e) => {
        e.preventDefault();
        setDiagnosis(e.target.value);
    };

    const setJustificationHandler = (e) => {
        e.preventDefault();
        setJustification(e.target.value);
    };

    const setRecommendationHandler = (e) => {
        e.preventDefault();
        setRecommendation(e.target.value);
    };

    const setCategoryHandler = (e) => {
        console.log('this is the target', e.target);
        e.preventDefault();
        if (e.target.value === "Undefined") {
            setCategory(0)
        } else if (e.target.value === "Medical") {
            setCategory(1)
        } else if (e.target.value === "Administrative") {
            setCategory(2)
        } else
            setCategory(3)
        // setCategory(e.target.value)
    };

    const addCaseHandler = async event => {
        event.preventDefault();
        const data = {
            title: title,
            description: description,
            diagnosis: diagnosis,
            justification: justification,
            recommendation: recommendation,
            category: category,
        };
        await props.dispatch(addCaseFunction(data));
        setTitle('');
        setDescription('');
        setDiagnosis('');
        setJustification('');
        setRecommendation('');
        setCategory(null);
        props.history.push("/cases/");
    };

  return (
      <Container>
          <div>
              title:
          </div>
          <FieldInput
            name="title"
            onChange={setTitleHandler}
            value={title}
            required
          />
          <div>
              description:
          </div>
          <FieldInput
            name="description"
            onChange={setDescriptionHandler}
            value={description}
            required
          />
          <div>
              diagnosis:
          </div>
          <FieldInput
            name="diagnosis"
            onChange={setDiagnosisHandler}
            value={diagnosis}
            required
          />
          <div>
              justification:
          </div>
          <FieldInput
            name="justification"
            onChange={setJustificationHandler}
            value={justification}
            required
          />
          <div>
              recommendation:
          </div>
          <FieldInput
            name="recommendation"
            onChange={setRecommendationHandler}
            value={recommendation}
            required
          />
          <div>
              category:
          </div>

          <CategoryDropdown onChange={setCategoryHandler}>
              <option>Select a category...</option>
                            {props.categories
                                ? props.categories.map( (category) => {
                                    return (
                                        <option key={category.id} id={category.id}>{category.name}</option>
                                    )
                            }): null}
          </CategoryDropdown>
          <AddButton onClick={addCaseHandler}>Add</AddButton>
      </Container>
  );
}

const mapStateToProps = (state) => {
    console.log('state in add', state);
  return {
      organisations: state.organisations,
      categories: state.categories,
  };
};

export default connect(mapStateToProps)(AddCase);
