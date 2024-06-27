import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/images/svg/SearchBtn.svg";
import useFilterStore from "../../store/useFilterstore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../enums/CommonEnum";
import { errorNotification } from "../../utils/Notification";

const SubmitBtn: React.FC = () => {
  const nav = useNavigate();
  const [inputNullCheck, setInputNullCheck] = useState<boolean>(false);

  const {
    destination,
    companion,
    style,
    startDate,
    endDate,
    nights,
    clearOptions,
  } = useFilterStore();

  const InputData = {
    place: destination,
    companions: companion,
    nights: nights,
    theme: style,
    startdate: startDate,
    enddate: endDate,
  };

  const checkInputNull = () => {
    if (
      destination === "" ||
      companion === "" ||
      style === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      setInputNullCheck(true);
    } else {
      setInputNullCheck(false);
    }
  };

  const handleSubmit = async () => {
    // 로그인 여부 확인
    if (localStorage.getItem("token") === null) {
      errorNotification("로그인이 필요합니다.");
      return;
    }
    checkInputNull(); // 필드 입력 여부 확인
    if (inputNullCheck) {
      errorNotification("모든 필드를 입력해주세요.");
      return;
    } else {
      nav(ROUTES.LOADING, { state: { inputData: InputData } });
      clearOptions();
    }
  };

  return (
    <SubmitBtnContainer onClick={handleSubmit}>
      <SubmitBtnImg src={SearchIcon} />
    </SubmitBtnContainer>
  );
};

export default SubmitBtn;

const SubmitBtnContainer = styled.div`
  background: black;
  width: 6.77vw;
  height: 6.77vw;
  padding: 1.56px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SubmitBtnImg = styled.img`
  width: 2vw;
`;
