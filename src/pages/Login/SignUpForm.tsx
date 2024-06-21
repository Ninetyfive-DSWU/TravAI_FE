import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';
import { successNotification, errorNotification } from '@utils/Notification';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';
import { registerUser, validateEmail, validateUsername, validatePassword } from '@api/loginApi';

const SignUpForm: React.FC = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const newErrors: { [key: string]: string } = {};

  useEffect(() => {
    validateForm();
  }, [username, email, password, confirmPassword]);

  const validateForm = () => {
    if (username && !validateUsername(username)) {
      newErrors.username = '아이디는 4~16자의 알파벳, 숫자, 밑줄(_)만 가능합니다.';
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
  };

  const handleSignUp = async () => {
    if (username.trim() === '') {
      newErrors.username = '아이디를 입력해주세요.';
    } else if (!validateUsername(username)) {
      newErrors.username = '아이디는 4~16자의 알파벳, 숫자, 밑줄(_)만 가능합니다.';
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

    const userData = {
      username: username,
      email: email,
      password1: password,
      password2: confirmPassword,
    };

    const data = await registerUser(userData);

    // 사용중인 아이디인 경우
    if (data.username && data.username[0] === 'User with this username already exists.') {
      const message: string = '이미 존재하는 아이디입니다.';
      errorNotification(message);
      setUsername('');
      return;
    }
    // 아이디와 비슷한 비밀번호인 경우
    else if (data.non_field_errors) {
      const message: string = '아이디와 유사하지 않은 비밀번호를 설정해주세요.';
      errorNotification(message);
    }
    // 입력하지 않은 항목이 있는 경우
    else if (data.username || data.email || data.password1 || data.password2) {
      const message: string = '모든 항목을 올바른 형식으로 입력해주세요.';
      errorNotification(message);
      return;
    } else {
      const message: string = '회원가입 성공!';
      successNotification(message);
      nav('/login');
      return;
    }
  };

  return (
    <Space direction='vertical' style={{ gap: pxToVw(16) }}>
      <Field>
        <Input
          style={{ width: pxToVw(609), height: pxToVw(78.23) }}
          placeholder='아이디 또는 이메일'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
