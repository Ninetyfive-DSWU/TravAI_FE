import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../../enums/CommonEnum";
import Logo from "../../../assets/images/png/Logo.png";

const HeaderLogo: React.FC = () => {
  return (
    <Link to={ROUTES.HOME}>
      <LogoImg src={Logo} alt="logo" />
    </Link>
  );
};

export default HeaderLogo;

const LogoImg = styled.img`
  width: 8.48vw;
  cursor: pointer;
`;
