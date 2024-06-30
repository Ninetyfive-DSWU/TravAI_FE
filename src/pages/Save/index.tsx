import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "@components/ui/Typography/Typography";
import usePlanStore from "@store/usePlanStore";
import Preparation from "@pages/Save/Preparation";
import PlanTable from "@pages/Save/PlanTable";
// import axios from "axios";

const Save: React.FC = () => {
  const { plans } = usePlanStore();
  const [userId, setUserId] = useState<string>("");

  const city = plans[0].city;
  const startDate = plans[0].startday;
  const endDate = plans[0].endday;

  useEffect(() => {
    const storedUsername = localStorage.getItem("userId") || "";
    setUserId(storedUsername);
  }, []);

  return (
    <SaveContainer>
      <TravelInfo>
        <Typography content={`${userId}님의 ${city}여행`} size={32} fontWeight={700} />
        <Typography content={`${startDate} ~ ${endDate}`} size={27} fontWeight={400} />
      </TravelInfo>
      <Preparation />
      <PlanTable />
    </SaveContainer>
  );
};

export default Save;

const SaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  width: 100%;
  padding: 20mm 25vw;
  overflow: inherit;
`;

const TravelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
