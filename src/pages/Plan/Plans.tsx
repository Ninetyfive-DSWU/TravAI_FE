import React, { useMemo } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import usePlanStore from "@store/usePlanStore";
import useModeStore from "@store/useModeStore";
import pxToVw from "@utils/PxToVw";
import Icon from "@components/ui/IconComponent";

const Plans: React.FC = () => {
  const { plans, setPlans, currentDay } = usePlanStore();
  const { editMode } = useModeStore();

  const dailyPlans = useMemo(() => plans.filter((plan) => currentDay === parseInt(plan.day)), [plans, currentDay]);

  // 드래그가 끝났을 때 호출되는 함수
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedPlans = Array.from(plans);
    const [movedItem] = updatedPlans.splice(result.source.index, 1);
    updatedPlans.splice(result.destination.index, 0, movedItem);

    setPlans(updatedPlans);
  };

  const handleDeletePlan = (planId: number) => {
    const updatedPlans = plans.filter((plan) => plan.id !== planId);
    setPlans(updatedPlans);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="plans" isDropDisabled={!editMode}>
        {(provided) => (
          <PlansContainer {...provided.droppableProps} ref={provided.innerRef}>
            {dailyPlans.map((plan, index) => {
              if (currentDay === parseInt(plan.day)) {
                return (
                  <Draggable key={index} draggableId={`plan-${index}`} index={index} isDragDisabled={!editMode}>
                    {(provided) => (
                      <PlanContainer>
                        <Index>{index + 1}</Index>
                        <PlanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Time>시간 설정</Time>
                          <VerticalLine />
                          <Place>{plan.place}</Place>
                          {editMode && (
                            <Icon
                              name="delete"
                              style={{ position: "absolute", top: "0", right: "0" }}
                              onClick={() => handleDeletePlan(plan.id)}
                            />
                          )}
                        </PlanItem>
                      </PlanContainer>
                    )}
                  </Draggable>
                );
              }
            })}
            {provided.placeholder}
          </PlansContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Plans;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Index = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: black;
  color: white;
`;

const PlanItem = styled.div`
  width: 80%;
  height: ${pxToVw(104)};
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const Time = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  color: lightgray;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 24px;
  background-color: #ccc;
`;

const Place = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;
