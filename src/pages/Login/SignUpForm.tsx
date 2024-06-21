import React, { useState } from 'react';
import pxToVw from '@utils/PxToVw';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';

const SignUpForm: React.FC = () => {
  const [, setPasswordVisible] = useState(false);

  return (
    <Space direction='vertical' style={{ gap: pxToVw(36) }}>
      <Input style={{ width: pxToVw(609), height: pxToVw(78.23) }} placeholder='아이디 또는 이메일' />
      <Input style={{ width: pxToVw(609), height: pxToVw(78.23) }} placeholder='이메일' />
      <Input.Password
        style={{ width: pxToVw(609), height: pxToVw(78.23) }}
        placeholder='비밀번호'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Input.Password
        style={{ width: pxToVw(609), height: pxToVw(78.23) }}
        placeholder='비밀번호 확인'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        style={{ width: pxToVw(609), height: pxToVw(78.23), background: 'black', color: 'white' }}
        onClick={() => setPasswordVisible((prevState) => !prevState)}
      >
        회원가입
      </Button>
    </Space>
  );
};

export default SignUpForm;
