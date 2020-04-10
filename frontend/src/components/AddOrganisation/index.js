import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import {addOrganisationFunction} from "../../store/actions/addOrganisationAction";
import {Dropdown} from "../../styles/Dropdowns";
import {organisationsFunction} from "../../store/actions/organisationsAction";
import {organisationCategoriesFunction} from "../../store/actions/organisationCategoriesAction";


const Container = styled.div`
  width: auto;
  height: 100;
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


function AddOrganisation(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [services, setServices] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    const [members, setMembers] = useState('');

    useEffect(() => {
        props.dispatch(organisationCategoriesFunction());
    }, []);

    const setNameHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const setDescriptionHandler = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };
    const setCategoryHandler = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    };
    const setTagHandler = (e) => {
        e.preventDefault();
        setTag(e.target.value);
    };
    const setMembersHandler = (e) => {
        e.preventDefault();
        setMembers(e.target.value);
    };

    const addOrganisationHandler = async event => {
        event.preventDefault();
        const data = {
            name: name,
            description: description,
            category: category,
            tag: tag,
            members: members,
        };
        await props.dispatch(addOrganisationFunction(data));
        setName('');
        setDescription('');
        setCategory('');
        setTag('');
        setMembers('');
        props.history.push("/organisations/");
    };


  return (
      <Container>
          <div>
              name:
          </div>
          <FieldInput
            name="name"
            onChange={setNameHandler}
            value={name}
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
              category:
          </div>

          <CategoryDropdown onChange={setCategoryHandler}>
              <option>Select a category...</option>
                            {/*{categories*/}
                            {/*    ? categories.map( (category,index) => {*/}
                            {/*        return (*/}
                            {/*            <option value={index+1} key={category}>{category}</option>*/}
                            {/*        )*/}
                            {/*}): null}*/}
          </CategoryDropdown>
          <div>
              tag:
          </div>
          <FieldInput
            name="tag"
            onChange={setTagHandler}
            value={tag}
            required
          />
          <div>
              members:
          </div>
          <FieldInput
            name="members"
            onChange={setMembersHandler}
            value={members}
            required
          />
          <AddButton onClick={addOrganisationHandler}>Add</AddButton>
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

export default connect(mapStateToProps)(AddOrganisation);
