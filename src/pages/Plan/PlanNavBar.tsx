import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@enums/CommonEnum";
import styled from "styled-components";
import { Button } from "antd";
import pxToVw from "@utils/PxToVw";
import usePlanStore from "@store/usePlanStore";
import useModeStore from "@store/useModeStore";
import AddPlan from "@components/ui/Modal/AddPlan";
import { UpdatePlan } from "@api/planListApi";

const PlanNavBar: React.FC = () => {
  const nav = useNavigate();
  const { nights, currentDay, setCurrentDay, plans, setPlans } = usePlanStore();
  const { editMode, setEditMode } = useModeStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { sessionId } = useParams<{ sessionId: string }>();

  const clickDayButton = (day: number) => () => {
    const selectedDay = day + 1;
    setCurrentDay(selectedDay);
  };

  const clickEdit = () => {
    setEditMode(!editMode);
  };

  const clickUpdate = async () => {
    setEditMode(!editMode);
    if (sessionId) {
      try {
        const updatedPlans = await UpdatePlan(sessionId, plans);
        console.log("Plans updated successfully:", updatedPlans);
        setPlans(plans);
      } catch (error) {
        console.error("Failed to update plans:", error);
      }
    } else {
      console.error("Session을 찾을 수 없음");
    }
  };

  const handleOk = () => {
    setTimeout(() => {
      setModalOpen(false);
      // 버튼 누른 후 지도에 반영하도록 로딩 동작하는 방법
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
        {[...Array(nights + 1).keys()].map((day) => {
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
        {editMode === false ? (
          <>
            <Button onClick={clickEdit}>편집</Button>
            <Button onClick={clickSave}>계획표 저장</Button>
          </>
        ) : (
          <>
            <Button
              onClick={clickUpdate}
              style={{
                backgroundColor: editMode ? "black" : undefined,
                color: editMode ? "white" : undefined,
              }}
            >
              저장
            </Button>
            <Button onClick={clickAdd}>일정 추가</Button>
            <Button onClick={clickSave}>계획표 저장</Button>
          </>
        )}
      </ButtonContainer>
      {modalOpen && <AddPlan modalOpen={modalOpen} handleOk={handleOk} handleCancel={handleCancel} />}
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
