import HelpForm from "../components/HelpPageComponents/HelpForm"
import { ToastContainer } from 'react-toastify';
import BreadcumbNavigation from "../components/Common/BreadcrumbNavigation";

const HelpPage = () => {
  return (
    <>
    <BreadcumbNavigation
        linkToPage={`/`}
        firstLink="homeNavigationName"
        currentLink="helpNavigationName"
      />
      <HelpForm />
      <ToastContainer />
    </>
  );
}

export default HelpPage