import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const initialItems: string[] = ['N서울타워', '경복궁', '북촌 한옥마을'];

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<string[]>(initialItems);

  // 드래그가 끝났을 때 호출되는 함수
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedPlans = Array.from(plans);
    const [movedItem] = updatedPlans.splice(result.source.index, 1);
    updatedPlans.splice(result.destination.index, 0, movedItem);

    setPlans(updatedPlans);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='plans'>
        {(provided) => (
          <PlansContainer {...provided.droppableProps} ref={provided.innerRef}>
            {plans.map((plan, index) => (
              <Draggable key={index} draggableId={`plan-${index}`} index={index}>
                {(provided) => (
                  <Plan>
                    <Index>{index + 1}</Index>
                    <PlanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {plan}
                    </PlanItem>
                  </Plan>
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

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Plan = styled.div`
  display: flex;
`;

const Index = styled.div`
  width: 20%;
  height: 50px;
`;

const PlanItem = styled.div`
  width: 80%;
  height: 50px;

  display: flex;
  align-items: center;

  border: 1px solid lightgrey;
  border-radius: 4px;
  background-color: white;
`;
