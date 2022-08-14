import "./App.css";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
 
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

export default function App() {
  return (
    <div>
      <ul>Navigation
        <li>
          <Link to="/">Landing Page</Link>
        </li>
        <li>
        <Link to="/login">Login Page</Link>
        </li>
        <li>
        <Link to="/register">Register Page</Link>
        </li>
      </ul>
      <hr/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </div>
  );
}
