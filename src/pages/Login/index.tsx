import React from 'react';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';

import Typography from '@components/ui/Typography/Typography';
import LoginForm from '@pages/Login/LoginForm';
import SignUpForm from '@pages/Login/SignUpForm';

interface LoginProps {
  type: 'login' | 'signup';
}

const Login: React.FC<LoginProps> = ({ type }) => {
  return (
    <LoginContainer>
      {type === 'login' ? (
        <Typography content='로그인' size={50} fontWeight={700} />
      ) : (
        <Typography content='회원가입' size={50} fontWeight={700} />
      )}
      {type === 'login' ? <LoginForm /> : <SignUpForm />}
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToVw(85)};
`;
