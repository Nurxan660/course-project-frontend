import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Registration from "./components/Registration";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
