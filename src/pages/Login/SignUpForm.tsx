import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';
import { validateEmail, validateId, validatePassword } from '@api/registerApi';

const SignUpForm: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const newErrors: { [key: string]: string } = {};

  useEffect(() => {
    validateForm();
  }, [id, email, password, confirmPassword]);

  const validateForm = () => {
    if (id && !validateId(id)) {
      newErrors.id = '아이디는 4~16자의 알파벳, 숫자, 밑줄(_)만 가능합니다.';
    }

    if (email && !validateEmail(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (password && !validatePassword(password)) {
      newErrors.password = '비밀번호는 최소 8자의 알파벳, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSignUp = async () => {
    if (id.trim() === '') {
      newErrors.id = '아이디를 입력해주세요.';
    } else if (!validateId(id)) {
      newErrors.id = '아이디는 4~16자의 알파벳, 숫자, 밑줄(_)만 가능합니다.';
    }

    if (email.trim() === '') {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (password.trim() === '') {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(password)) {
      newErrors.password = '비밀번호는 최소 8자의 알파벳, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = '비밀번호를 확인해주세요.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

    // const userData = {
    //   id: id,
    //   email: email,
    //   password1: password,
    //   password2: confirmPassword,
    // };

    // try {
    //   registerUser(userData);
    //   redirect('/login');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Space direction='vertical' style={{ gap: pxToVw(16) }}>
      <Field>
        <Input
          style={{ width: pxToVw(609), height: pxToVw(78.23) }}
          placeholder='아이디 또는 이메일'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <span style={{ color: 'red', height: '10px' }}>{errors.id}</span>
      </Field>
      <Field>
        <Input
          style={{ width: pxToVw(609), height: pxToVw(78.23) }}
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span style={{ color: 'red', height: '10px' }}>{errors.email}</span>
      </Field>
      <Field>
        <Input.Password
          style={{ width: pxToVw(609), height: pxToVw(78.23) }}
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <span style={{ color: 'red', height: '10px' }}>{errors.password}</span>
      </Field>
      <Field>
        <Input.Password
          style={{ width: pxToVw(609), height: pxToVw(78.23) }}
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          visibilityToggle={false}
        />
        <span style={{ color: 'red', height: '10px' }}>{errors.confirmPassword}</span>
      </Field>
      <Button
        style={{ width: pxToVw(609), height: pxToVw(78.23), background: 'black', color: 'white' }}
        onClick={handleSignUp}
      >
        회원가입
      </Button>
    </Space>
  );
};

export default SignUpForm;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
