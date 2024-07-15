import React, { useMemo } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Dayjs } from "dayjs";
import usePlanStore from "@store/usePlanStore";
import useModeStore from "@store/useModeStore";
import { TimePicker } from "antd";
import pxToVw from "@utils/PxToVw";
import Icon from "@components/ui/IconComponent";
import Typography from "@components/ui/Typography/Typography";

const Plans: React.FC = () => {
  const { plans, setPlans, currentDay } = usePlanStore();
  const { editMode } = useModeStore();

  const dailyPlans = useMemo(
    () => plans.filter((plan) => currentDay === parseInt(plan.day)).sort((a, b) => a.order - b.order),
    [plans, currentDay],
  );

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

  const handleTimeChange = (time: Dayjs | null, timeString: string | string[], planId: number): void => {
    const updatedPlans = plans.map((plan) => (plan.id === planId ? { ...plan, time: timeString.toString() } : plan));
    setPlans(updatedPlans);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="plans" isDropDisabled={!editMode}>
        {(provided) => (
          <PlansContainer {...provided.droppableProps} ref={provided.innerRef}>
            {dailyPlans.map((plan, index) => (
              <Draggable key={index} draggableId={`plan-${index}`} index={index} isDragDisabled={!editMode}>
                {(provided) => (
                  <PlanContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Index>{index + 1}</Index>
                    <StyledPlanItem isEdit={editMode}>
                      <TimeContainer>
                        {editMode ? (
                          <StyledTimePicker
                            format="hh:mm A"
                            showNow={false}
                            minuteStep={5}
                            variant="borderless"
                            placeholder={plan.time === " " ? "시간 설정" : plan.time}
                            onChange={(time, timeString) => handleTimeChange(time, timeString, plan.id)}
                            hasTime={plan.time === " "}
                          />
                        ) : (
                          <Time hasTime={plan.time === " "}>
                            {plan.time === " " ? (
                              "시간 설정"
                            ) : (
                              <Typography content={plan.time} size={16} style={{ textAlign: "center" }} />
                            )}
                          </Time>
                        )}
                        <VerticalLine />
                      </TimeContainer>
                      <Place>
                        <Typography content={plan.place} size={16} style={{ textAlign: "center" }} />
                      </Place>
                      {editMode && (
                        <Icon
                          name="delete"
                          style={{ position: "absolute", top: "0", right: "0" }}
                          onClick={() => handleDeletePlan(plan.id)}
                        />
                      )}
                    </StyledPlanItem>
                  </PlanContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </PlansContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Plans;

interface Props {
  hasTime?: boolean;
  isEdit?: boolean;
}

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding: 16px 0;
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

const StyledPlanItem = styled(PlanItem)<Props>`
  .ant-picker-small .ant-picker-input input {
    font-size: 10px;
  }

  &:hover {
    background-color: ${(props) => (props.isEdit ? "#e5e5e5" : "white")};
  }
`;

const TimeContainer = styled.div`
  width: 40%;
  display: flex;
`;

const Time = styled.div<Props>`
  display: flex;
  align-items: center;
  font-size: 10px;
  width: 100%;
  justify-content: center;
  color: ${(props) => (props.hasTime ? "lightgray" : "black")};
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 24px;
  background-color: #ccc;
`;

const Place = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

interface StyledTimePickerProps {
  hasTime: boolean;
}

const StyledTimePicker = styled(TimePicker)<StyledTimePickerProps>`
  .ant-picker-input {
    width: 80%;
  }

  .ant-picker-input input {
    font-size: 10px;
    &::placeholder {
      color: ${(props) => (props.hasTime ? "lightgray" : "black")};
    }
  }

  display: flex;
  justify-content: center;
`;
