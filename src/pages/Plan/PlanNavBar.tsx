import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@enums/CommonEnum";
import styled from "styled-components";
import { Button } from "antd";
import pxToVw from "@utils/PxToVw";
import usePlanStore from "@store/usePlanStore";
import useModeStore from "@store/useModeStore";
import AddPlan from "@components/ui/Modal/AddPlan";

const PlanNavBar: React.FC = () => {
  const nav = useNavigate();
  const { nights, currentDay, setCurrentDay } = usePlanStore();
  const { editMode, setEditMode } = useModeStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const clickDayButton = (day: number) => () => {
    const selectedDay = day + 1;
    setCurrentDay(selectedDay);
  };

  const clickEdit = () => {
    setEditMode(!editMode);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      // 버튼 누른 후 지도에 반영하도록 로딩 동작하는 방법
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const clickAdd = () => {
    setModalOpen(true);
  };

  const clickSave = () => {
    nav(ROUTES.SAVE);
  };

  return (
    <SideContainer>
      <DayContainer>
        {[...Array(nights+1).keys()].map((day) => {
          const isCurrentDay = currentDay === day + 1;
          return (
            <Button
              key={day}
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
        <Button onClick={clickAdd}>일정 추가</Button>
        <Button onClick={clickSave}>계획표 저장</Button>
      </ButtonContainer>
      <AddPlan confirmLoading={confirmLoading} modalOpen={modalOpen} handleOk={handleOk} handleCancel={handleCancel} />
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
