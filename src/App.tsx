import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Registration from "./components/Registration";
import HomePage from "./pages/HomePage";
import UserMainPage from "./pages/CollectionsPage";
import Login from "./components/Login";
import AddCollectionPage from "./pages/AddCollectionPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getCurrentLanguageCode } from "./service/utils/langUtils";
import EditCollectionPage from "./pages/EditCollectionPage";
import { CollectionFormStoreProvider } from "./context/CollectionFormContext";
function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const currentLangCode = getCurrentLanguageCode() || 'en';
    i18n.changeLanguage(currentLangCode);
  }, []);
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<UserMainPage />} />
        <Route path="/collections/add" element={<AddCollectionPage />} />
        <Route path="/collections/edit/:id" element={
        <CollectionFormStoreProvider>
          <EditCollectionPage />
        </CollectionFormStoreProvider>
      } />
      </Routes>
    </>
  );
}

export default App;
