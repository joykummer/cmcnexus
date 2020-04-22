import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {login} from '../../store/actions/Authentication/loginActions';
import isEmail from '../../helpers/isEmail';
import {CardBox} from '../../styles/GenericBoxes';
import {GreyRoundInput} from '../../styles/Inputs';
import {RedButton} from '../../styles/Buttons';
import msf_logo from '../../assets/MSF_logo_international_small.jpg'
import propulsion_logo from "../../assets/Propulsion_LogoText_horizontalSwiss_Logo Kopie.png";


const Background = styled.div`
width: 100%;
background: #FFF;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`;

const Card = styled(CardBox)`
border: solid 1px #EBEBEB;
padding: 60px;
width: 50%;
max-width: 500px;
`;

const Text = styled.div`
font-size: 18px;
color: #717171;
margin-bottom: 7px;
`;

const Span = styled.span`
font-size: 15px;
color: #717171;
margin-left: 7px;
`;

const LoginInput = styled(GreyRoundInput)`
width: 100%;
margin-bottom: 25px;
`;

const Controls = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ForgotBox = styled.div`
margin-top: 25px;
`;

const Logo = styled.img`
height: 200px;
margin: 40px;
`;

export const PropulsionLogo = styled.img`
position: absolute;
bottom: 0;
right: 0;
align-self: flex-end;
height: 40px;
`;

export function Login() {
	const is_authenticated = useSelector(state => state.auth.is_authenticated)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(true);
	const dispatch = useDispatch();

	const LoginSubmitHandler = e => {
		e.preventDefault();
		if (isEmail(email) && password) {
			login({email, password, rememberMe})(dispatch);
		}
	}

	return (
		is_authenticated ?
			<Redirect to={{pathname: "/"}} /> :
			<Background>
				<Logo src={msf_logo}/>
				<Card>
					<form onSubmit={LoginSubmitHandler}>
						<Text>Email address</Text>
						<LoginInput name={'email'} type={'email'} value={email} onChange={e => setEmail(e.target.value)}/>

						<Text>Password</Text>
						<LoginInput name={'password'} type={'password'} value={password}
												onChange={e => setPassword(e.target.value)}/>

						<Controls>
							<label>
								<input type={'checkbox'} checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}/>
								<Span>Remember Me</Span>
							</label>
							<RedButton type={'submit'}>Log In</RedButton>
						</Controls>
					</form>
				</Card>
				<PropulsionLogo src={propulsion_logo}/>
			</Background>
	);
}