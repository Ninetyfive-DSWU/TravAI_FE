import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';
import { successNotification, errorNotification } from '@utils/Notification';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';
import { login } from '@api/loginApi';

const LoginForm: React.FC = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClickSignUp = () => {
    nav('/signup');
  };

  const loginData = {
    username: username,
    password: password,
  };

  const handleLogin = async () => {
    const data = await login(loginData);

    if (data.non_field_errors) {
      const message: string = '잘못된 로그인 정보입니다.';
      errorNotification(message);
    }
    if (data.key) {
      const message: string = '로그인 성공!';
      successNotification(message);
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);
    }
  };

  return (
    <Space direction='vertical' style={{ gap: pxToVw(36), alignItems: 'center' }}>
      <Input
        style={{ width: pxToVw(609), height: pxToVw(78.23) }}
        placeholder='아이디 또는 이메일'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input.Password
        style={{ width: pxToVw(609), height: pxToVw(78.23) }}
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        style={{ width: pxToVw(609), height: pxToVw(78.23), background: 'black', color: 'white' }}
        onClick={handleLogin}
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
