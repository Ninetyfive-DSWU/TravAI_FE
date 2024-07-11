import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ENVMODE, ROUTES } from "@enums/CommonEnum";
import Home from "@pages/Home";
import Login from "@pages/Login";
import MyPage from "@pages/MyPage";
import Plan from "@pages/Plan";
import Loading from "@pages/Loading";
import Save from "@pages/Save";
import { SYSTEM_MODE } from "@constants/Constants";
import GlobalStyle from "@assets/styles/GlobalStyle";
import Base from "@components/layouts/Base";

const App: React.FC = () => {
  useEffect(() => {
    if (SYSTEM_MODE !== ENVMODE.PROD) {
      console.log("현재 모드", SYSTEM_MODE);
    }
  }, []);

  return (
    <BrowserRouter>
      <Base>
        <GlobalStyle />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login type="login" />} />
          <Route path={ROUTES.SIGNUP} element={<Login type="signup" />} />
          <Route path={ROUTES.MYPAGE} element={<MyPage />} />
          <Route path={ROUTES.PLAN} element={<Plan />} />
          <Route path={ROUTES.LOADING} element={<Loading />} />
          <Route path={ROUTES.SAVE} element={<Save />} />
        </Routes>
      </Base>
    </BrowserRouter>
  );
};

export default App;
