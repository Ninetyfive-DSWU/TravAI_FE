import Typography from "@components/ui/Typography/Typography";
import pxToVw from "@utils/PxToVw";
import React from "react";
import styled from "styled-components";
import usePlanStore from "@store/usePlanStore";

const PlanTitle: React.FC = () => {
  const { plans, currentDay } = usePlanStore();

  return (
    <PlanContainer>
      <TitleContainer>
        <Typography content={`${plans[0].city} 여행 ${currentDay}일차 일정`} size={32} fontWeight={700} />
        <Typography content={`${plans[0].startday} ~ ${plans[0].endday}`} color="gray" size={27} />
      </TitleContainer>
    </PlanContainer>
  );
};

export default PlanTitle;

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(20)};
`;
