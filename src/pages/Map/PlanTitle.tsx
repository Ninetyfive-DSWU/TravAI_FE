import Typography from '@components/ui/Typography/Typography';
import pxToVw from '@utils/PxToVw';
import React from 'react';
import styled from 'styled-components';

const PlanTitle: React.FC = () => {
  return (
    <PlanContainer>
      <TitleContainer>
        <Typography content='OO 여행 O일차 일정' size={32} />
        <Typography content='00.00.00 ~ 00.00.00' color='gray' size={27} />
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
