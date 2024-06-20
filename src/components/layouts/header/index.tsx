import styled from "styled-components";
import HeaderMenu from "@components/layouts/header/HeaderMenu";
import LoginSection from "@components/layouts/header/LoginSection";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderInner>
        <HeaderMenu />
        <LoginSection />
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  height: 6.15vw;
  align-items: center;
  justify-content: center;
  padding: 0px 5.73vw;
  background-color: #fff;
  z-index: 999;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 38.02vw;
`;
