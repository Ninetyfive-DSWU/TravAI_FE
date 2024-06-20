import React from "react";
import styled from "styled-components";
import FilterBox from "@pages/Home/FilterBox";
import thumnail from "../../assets/images/png/background.png";

const Home: React.FC = () => {
  return (
    <MainSection>
      <Img src={thumnail} />
      <FilterBox />
    </MainSection>
  );
};

export default Home;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
`;

const Img = styled.img`
  width: 88.54vw;
  height: 34.74vw;
  border-radius: 3.125rem;
  object-fit: cover;
`;
