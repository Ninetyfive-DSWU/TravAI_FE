import pxToVw from "@utils/PxToVw";
import React from "react";
import styled from "styled-components";
import PlanNavBar from "@pages/Plan/PlanNavBar";
import PlanTitle from "@pages/Plan/PlanTitle";
import Plans from "@pages/Plan/Plans";

const PlanPage: React.FC = () => {
  return (
    <PlanPageContainer>
      <PlanNavBar />
      <PlansContainer>
        <PlanTitle />
        <Plans />
      </PlansContainer>
    </PlanPageContainer>
  );
};

export default PlanPage;

const PlanPageContainer = styled.div`
  width: ${pxToVw(630)};
  background: white;
  display: flex;
  margin: ${pxToVw(20)};
  gap: ${pxToVw(30)};
`;

const PlansContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(30)};
`;
