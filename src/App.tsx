import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Registration from "./components/Registration";
import HomePage from "./pages/HomePage";
import UserMainPage from "./pages/UserPages/UserMainPage";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserMainPage />} />
      </Routes>
    </>
  );
}

export default App;
