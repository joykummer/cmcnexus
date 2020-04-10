import React, {useState} from 'react';
import styled from 'styled-components';
import {CardBox} from '../../styles/GenericBoxes';
import {GreyRoundInput} from '../../styles/Inputs';
import {RedButton} from '../../styles/Buttons';
import {useDispatch} from 'react-redux';

import msf_logo from '../../assets/msf_logo.svg'
import {login} from '../../store/actions/loginActions';
import isEmail from '../../helpers/isEmail';


const Background = styled.div`
width: 100%;
background: #E5E5E5;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Card = styled(CardBox)`
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
margin-top: 50px;
`;

const Logo = styled.img`
margin: 20px;
`;


export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const dispatch = useDispatch();

	const LoginSubmitHandler = e => {
		e.preventDefault();
		if (isEmail(email) && password) {
			login({email, password, rememberMe})(dispatch);
		}
	}

	return (
		<Background>
			<Logo src={msf_logo} />
			<Card>
				<form onSubmit={LoginSubmitHandler}>
					<Text>Email address</Text>
					<LoginInput name={'email'} type={'email'} value={email} onChange={e => setEmail(e.target.value)}/>

					<Text>Password</Text>
					<LoginInput name={'password'} type={'password'} value={password} onChange={e => setPassword(e.target.value)}/>

					<Controls>
						<label>
							<input type={'checkbox'} checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}/>
							<Span>Remember Me</Span>
						</label>
						<RedButton type={'submit'}>Log In</RedButton>
					</Controls>
				</form>
			</Card>
			<ForgotBox>
				<Span>Forgot password?</Span>
			</ForgotBox>
		</Background>);
}