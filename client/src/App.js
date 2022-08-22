import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from './hoc/auth';

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

export default function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <div>
      <hr />
      {/* 이 부분을 이용해 hoc 적용 */}
      <Routes>
        <Route path="/" element={<AuthLandingPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegisterPage />} />
      </Routes>
    </div>
  );
}
