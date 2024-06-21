import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';

const LoginForm: React.FC = () => {
  const nav = useNavigate();
  const [, setPasswordVisible] = useState(false);

  const handleClickSignUp = () => {
    nav('/signup');
  };

  return (
    <Space direction='vertical' style={{ gap: pxToVw(36), alignItems: 'center' }}>
      <Input style={{ width: pxToVw(609), height: pxToVw(78.23) }} placeholder='아이디 또는 이메일' />
      <Input.Password
        style={{ width: pxToVw(609), height: pxToVw(78.23) }}
        placeholder='비밀번호'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        style={{ width: pxToVw(609), height: pxToVw(78.23), background: 'black', color: 'white' }}
        onClick={() => setPasswordVisible((prevState) => !prevState)}
      >
        로그인
      </Button>
      <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
    </Space>
  );
};

export default LoginForm;

const SignUpButton = styled.div`
  cursor: pointer;
`;
