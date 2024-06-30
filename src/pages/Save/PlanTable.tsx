import React from "react";
import styled from "styled-components";
import usePlanStore from "@store/usePlanStore";

interface Plan {
  day: string;
  time: string;
  place: string;
  note?: string;
}

interface GroupedPlans {
  [key: string]: Plan[];
}

const PlanTable: React.FC = () => {
  const { plans } = usePlanStore();

  // 일차별
  const groupedPlans = plans.reduce((acc: GroupedPlans, plan) => {
    if (!acc[plan.day]) {
      acc[plan.day] = [];
    }
    acc[plan.day].push(plan);
    return acc;
  }, {} as GroupedPlans);

  return (
    <Table>
      <thead>
        <tr>
          <th>일차</th>
          <th>시간</th>
          <th>장소</th>
          <th>기타사항</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedPlans).map(([day, details]) =>
          details.map((detail, subIndex) => (
            <tr key={subIndex}>
              {subIndex === 0 && <td rowSpan={details.length}>{day}일차</td>}
              <td>{detail.time}</td>
              <td>{detail.place}</td>
              <td>{detail.note || ""}</td>
            </tr>
          )),
        )}
      </tbody>
    </Table>
  );
};

export default PlanTable;

const Table = styled.table`
  width: 100%;
  height: 60vh;
  margin-bottom: 30px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
  }

  th {
    background-color: #f2f2f2;
    font-size: 18px;
  }

  td {
    font-size: 14px;
    vertical-align: middle;
  }
`;
