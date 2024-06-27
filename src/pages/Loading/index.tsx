import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filtering } from "../../api/filterApi";
import { ROUTES } from "../../enums/CommonEnum";
import useExpireModal from "../../components/ui/Modal/ExpireModal";

const Loading: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [loadingMessage, setLoadingMessage] = useState(
    "여행 계획을 생성하고 있습니다..."
  );
  const { showCountDownModal, contextHolder } = useExpireModal({
    title: "오류 발생",
  });
  interface FilterInputData {
    place: string;
    companions: string;
    nights: number;
    theme: string;
    startdate: string;
    enddate: string;
  }

  useEffect(() => {
    const { inputData } = location.state as { inputData: FilterInputData };

    const generatePlan = async () => {
      try {
        setLoadingMessage(
          "백엔드에서 여행 계획을 생성 중입니다. 잠시만 기다려주세요..."
        );
        const session_id = await Filtering(inputData);
        setLoadingMessage(
          "여행 계획이 생성되었습니다. 결과 페이지로 이동합니다..."
        );

        // 잠시 대기 후 Plan 페이지로 이동
        setTimeout(() => {
          nav(ROUTES.MAP, { state: { session_id } });
        }, 1500);
      } catch (error) {
        console.error("Error generating plan:", error);
        setLoadingMessage("오류가 발생했습니다. 다시 시도해주세요.");
        showCountDownModal();
      }
    };

    generatePlan();
  }, []);

  return (
    <div>
      <p>{loadingMessage}</p>
      {contextHolder}
    </div>
  );
};

export default Loading;
