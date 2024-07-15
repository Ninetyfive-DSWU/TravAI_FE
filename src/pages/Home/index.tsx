import React from "react";
import styled from "styled-components";
import { clearStoredMarkers } from "@utils/LocalStorage";
import FilterBox from "@pages/Home/FilterBox";
import Carousel from "@components/ui/Carousel/Carousel";

const Home: React.FC = () => {
  clearStoredMarkers();

  return (
    <MainSection>
      <MainContainer>
        {/* <Img src={thumnail} /> */}
        <Carousel />
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
