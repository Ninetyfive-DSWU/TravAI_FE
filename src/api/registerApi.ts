import { API_BASE_URL } from '@constants/Constants';

interface UserData {
  id: string;
  email: string;
  password1: string;
  password2: string;
}

export const registerUser = async (userData: UserData) => {
  const jsonUserData = JSON.stringify(userData);

  try {
    const response = await fetch(`${API_BASE_URL}/accounts/v1/registration/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonUserData,
    });

    if (response.status === 204) return {};
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 이메일 형식
export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

// 아이디 형식: 알파벳, 숫자, 밑줄(_)만 허용, 4~8자
export const validateId = (id: string): boolean => {
  return /^[a-zA-Z0-9_]{4,8}$/.test(id);
};

// 비밀번호 형식: 알파벳, 숫자, 특수문자 포함, 최소 8자,
export const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
