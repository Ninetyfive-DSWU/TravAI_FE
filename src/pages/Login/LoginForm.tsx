import React, { useState } from 'react';
import styled from 'styled-components';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';

const LoginForm: React.FC = () => {
  const [, setPasswordVisible] = useState(false);

  return (
    <Space direction='vertical' style={{ gap: '36px', alignItems: 'center' }}>
      <Input style={{ width: '609px', height: '78.23px' }} placeholder='아이디 또는 이메일' />
      <Input.Password
        style={{ width: '609px', height: '78.23px' }}
        placeholder='비밀번호'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        style={{ width: '609px', height: '78.23px', background: 'black', color: 'white' }}
        onClick={() => setPasswordVisible((prevState) => !prevState)}
      >
        로그인
      </Button>
      <SignUpButton>회원가입</SignUpButton>
    </Space>
  );
};

export default LoginForm;

const SignUpButton = styled.div`
  cursor: pointer;
`;
