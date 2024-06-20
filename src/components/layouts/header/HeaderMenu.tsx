import HeaderLogo from "@components/layouts/header/HeaderLogo";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../../enums/CommonEnum";

const HeaderMenu: React.FC = () => {
  const nav = useNavigate();
  return (
    <MenuInner>
      <HeaderLogo />
      <HomeBtn onClick={() => nav(ROUTES.HOME)}>HOME</HomeBtn>
      <AboutBtn onClick={() => nav(ROUTES.HOME)}>ABOUT</AboutBtn>
    </MenuInner>
  );
};

export default HeaderMenu;

const MenuInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7.81vw;
  align-items: center;
  height: 100%;
`;
const HomeBtn = styled.div`
  cursor: pointer;
  font-size: 1.61vw;
`;
const AboutBtn = styled.div`
  cursor: pointer;
  font-size: 1.61vw;
`;
