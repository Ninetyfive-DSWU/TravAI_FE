import React from 'react';

interface LoginProps {
  type: string;
}

const Login: React.FC<LoginProps> = ({ type }) => {
  return <p>{type} 페이지입니다.</p>;
};

export default Login;
