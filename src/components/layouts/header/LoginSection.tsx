import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "@enums/CommonEnum";
import HeaderDropdown from "./HeaderDropdown";

const LoginSection: React.FC = () => {
  const nav = useNavigate();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("userId") || "";
    setUserId(storedUsername);
  }, []);

  return (
    <MenuContainer>
      {userId ? (
        <HeaderDropdown />
      ) : (
        <>
          <LoginBtn onClick={() => nav(ROUTES.LOGIN)}>LOGIN</LoginBtn>
          <SignUpBtn onClick={() => nav(ROUTES.SIGNUP)}>SIGNUP</SignUpBtn>
        </>
      )}
    </MenuContainer>
  );
};

export default LoginSection;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7vw;
`;
const LoginBtn = styled.div`
  cursor: pointer;
  font-size: 1.61vw;
`;
const SignUpBtn = styled.div`
  cursor: pointer;
  font-size: 1.61vw;
`;
