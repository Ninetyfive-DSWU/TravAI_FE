import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from 'react-redux';
// import { store } from '@store/store';
import { ENVMODE, ROUTES } from "@enums/CommonEnum";
import Home from "@pages/Home";
import Login from "@pages/Login";
import MyPage from "@pages/MyPage";
import Map from "@pages/Map";
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
    // <Provider store={store}>
    <BrowserRouter>
      <Base>
        <GlobalStyle />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login type="login" />} />
          <Route path={ROUTES.SIGNUP} element={<Login type="signup" />} />
          <Route path={ROUTES.MYPAGE} element={<MyPage />} />
          <Route path={ROUTES.MAP} element={<Map />} />
        </Routes>
      </Base>
    </BrowserRouter>
    // </Provider>
  );
};

export default App;
