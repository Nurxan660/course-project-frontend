import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Registration from "./components/Registration";
import HomePage from "./pages/HomePage";
import UserMainPage from "./pages/CollectionsPage";
import Login from "./components/Login";
import AddCollectionPage from "./pages/AddCollectionPage";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<UserMainPage />} />
        <Route path="/collections/add" element={<AddCollectionPage />} />
      </Routes>
    </>
  );
}

export default App;
