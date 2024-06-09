import UserTicketsTable from "../components/HelpPageComponents/UserTicketsTable"
import { Container } from "react-bootstrap"
import { StoreProvider } from "../context/StoreContext";
import Pagination from "../components/Common/Pagination";

const UserTicketsPage = () => {
  return (
    <Container fluid className="h-100 pt-3">
      <StoreProvider>
        <UserTicketsTable />
        <Pagination />
      </StoreProvider>
    </Container>
  );
}

export default UserTicketsPage