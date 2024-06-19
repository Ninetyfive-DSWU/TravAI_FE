import React from 'react';
import styled from 'styled-components';
import LoginForm from '@pages/Login/LoginForm';
import SignUpForm from '@pages/Login/SignUpForm';

interface LoginProps {
  type: 'login' | 'signup';
}

const Login: React.FC<LoginProps> = ({ type }) => {
  return (
    <LoginContainer>
      <p>{type === 'login' ? '로그인' : '회원가입'}</p>
      {type === 'login' ? <LoginForm /> : <SignUpForm />}
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 85px;
  margin-top: 230px;
`;
