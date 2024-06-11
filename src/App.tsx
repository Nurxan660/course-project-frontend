import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Registration from "./components/Registration";
import HomePage from "./pages/MainPage";
import UserMainPage from "./pages/CollectionsPage";
import Login from "./components/Login";
import AddCollectionPage from "./pages/AddCollectionPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getCurrentLanguageCode } from "./service/utils/langUtils";
import EditCollectionPage from "./pages/EditCollectionPage";
import { CollectionFormStoreProvider } from "./context/CollectionFormContext";
import CollectionItemsPage from "./pages/CollectionItemsPage";
import AddItemPage from "./pages/AddItemPage";
import { ItemFormStoreProvider } from "./context/ItemFormContext";
import EditItemPage from "./pages/EditItemPage";
import ItemPage from "./pages/ItemPage";
import PrivateUserRoute from "./pages/private-routes/PrivateUserRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import PrivateAdminRoute from "./pages/private-routes/PrivateAdminRoute";
import HelpPage from "./pages/HelpPage";
import UserTicketsPage from "./pages/UserTicketsPage";

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
        <Route path="/help" element={<HelpPage />} />
        <Route path="/tickets" element={<UserTicketsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute
              component={<AdminPage />}
              errorComponent={<NotFoundPage />}
            />
          }
        />
        <Route
          path="/collections"
          element={
            <PrivateUserRoute
              component={<UserMainPage />}
              errorComponent={<NotFoundPage />}
            />
          }
        />
        <Route path="/collections/:id" element={<CollectionItemsPage />} />
        <Route path="/collections/:id/item/:itemId" element={<ItemPage />} />
        <Route
          path="/collections/add"
          element={
            <PrivateUserRoute
              component={
                <CollectionFormStoreProvider>
                  <AddCollectionPage />
                </CollectionFormStoreProvider>
              }
              errorComponent={<NotFoundPage />}
            />
          }
        />
        <Route
          path="/collections/:id/edit-item/:itemId"
          element={
            <PrivateUserRoute
              component={
                <ItemFormStoreProvider>
                  <EditItemPage />
                </ItemFormStoreProvider>
              }
              errorComponent={<NotFoundPage />}
            />
          }
        />
        <Route
          path="/collections/:id/add-item"
          element={
            <PrivateUserRoute
              component={
                <ItemFormStoreProvider>
                  <AddItemPage />
                </ItemFormStoreProvider>
              }
              errorComponent={<NotFoundPage />}
            />
          }
        />
        <Route
          path="/collections/edit/:id"
          element={
            <PrivateUserRoute
              component={
                <CollectionFormStoreProvider>
                  <EditCollectionPage />
                </CollectionFormStoreProvider>
              }
              errorComponent={<NotFoundPage />}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
