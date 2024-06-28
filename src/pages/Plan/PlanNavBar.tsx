import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import pxToVw from "@utils/PxToVw";
import usePlanStore from "@store/usePlanStore";
import useModeStore from "@store/useModeStore";

const PlanNavBar: React.FC = () => {
  const { nights, currentDay, setCurrentDay } = usePlanStore();
  const { editMode, setEditMode } = useModeStore();

  console.log(nights);
  const clickDayButton = (day: number) => () => {
    const selectedDay = day + 1;
    setCurrentDay(selectedDay);
  };

  const clickEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <SideContainer>
      <DayContainer>
        {[...Array(nights).keys()].map((day) => {
          const isCurrentDay = currentDay === day + 1;
          return (
            <Button
              onClick={clickDayButton(day)}
              style={{
                backgroundColor: isCurrentDay ? "black" : undefined,
                color: isCurrentDay ? "white" : undefined,
              }}
            >
              {day + 1}일차
            </Button>
          );
        })}
      </DayContainer>
      <ButtonContainer>
        <Button onClick={clickEdit}>편집</Button>
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
