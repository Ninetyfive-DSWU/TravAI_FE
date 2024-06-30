import React from "react";
import styled from "styled-components";
import Typography from "@components/ui/Typography/Typography";

const Preparation: React.FC = () => {
  return (
    <Container>
      <Typography content="준비물" size={20} fontWeight={700} />
      <PreparationList>
        <ListContainer>
          <Typography content="☐ 여권" />
          <Typography content="☐ 비상약" />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
        </ListContainer>
        <ListContainer>
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
        </ListContainer>
        <ListContainer>
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
          <Typography content="☐ " />
        </ListContainer>
      </PreparationList>
    </Container>
  );
};

export default Preparation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  border: 1px solid #a3a3a3;
  border-radius: 10px;
  padding: 24px;
`;

const PreparationList = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
