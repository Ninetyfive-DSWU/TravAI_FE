import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ENVMODE, ROUTES } from './enums/CommonEnum';
import Home from '@pages/Home';
import Login from '@pages/Login';
import { SYSTEM_MODE } from './constants/Constants';

const App: React.FC = () => {
  useEffect(() => {
    if (SYSTEM_MODE !== ENVMODE.PROD) {
      console.log('현재 모드', SYSTEM_MODE);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login type='login' />} />
        <Route path={ROUTES.SIGNUP} element={<Login type='sign up' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
