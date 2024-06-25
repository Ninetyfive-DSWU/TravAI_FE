import React from "react";
import styled from "styled-components";
import FilterBox from "@pages/Home/FilterBox";
import thumnail from "../../assets/images/png/background.png";
// import AddPlan from '@components/ui/Modal/AddPlan';

const Home: React.FC = () => {
  return (
    <MainSection>
      <MainContainer>
        <Img src={thumnail} />
        <FilterBox />
      </MainContainer>
    </MainSection>
  );
};

export default Home;

const MainSection = styled.div`
  height: calc(34.74vw + (9.42vw / 2));
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Img = styled.img`
  width: 88.54vw;
  height: 34.74vw;
  border-radius: 3.125rem;
  object-fit: cover;
`;
