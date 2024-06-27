import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import pxToVw from '@utils/PxToVw';

const PlanNavBar: React.FC = () => {
  return (
    <SideContainer>
      <DayContainer>
        <Button>1일차</Button>
        <Button>1일차</Button>
        <Button>1일차</Button>
      </DayContainer>
      <ButtonContainer>
        <Button>편집</Button>
        <Button>일정 추가</Button>
        <Button>계획표 저장</Button>
      </ButtonContainer>
    </SideContainer>
  );
};

export default PlanNavBar;

const SideContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(16)};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(16)};
`;
