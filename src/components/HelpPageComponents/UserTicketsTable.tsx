import { Table } from "react-bootstrap";
import { getTickets } from "../../api/jira";
import { usePaginationStore } from "../../context/StoreContext";
import { useEffect, useState } from "react";
import { IssuePaginationRes } from "../../types/jira-types/IssuePaginationRes";
import NotFoundComponent from "../Common/NotFoundComponent";

const UserTicketsTable = () => {
  const store = usePaginationStore();
  const [data, setData] = useState<IssuePaginationRes>();

  const handleGetTickets = async () => {
    try {
      const page = store?.page ? store?.page - 1 : 0;
      const res = await getTickets(page);
      store?.setTotalPages(res.data.total)
      setData(res.data);
      console.log(data);
    } catch (e) {}
  };

  useEffect(() => {
    handleGetTickets();
  }, [])

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data?.issues.map((v) => {
            return (
              <tr key={v?.id}>
                <td>{v?.id}</td>
                <td>{v?.fields?.status?.name}</td>
                <td>
                  {" "}
                  {v?.link && (
                    <a href={v.link} target="_blank" rel="noopener noreferrer">
                      View Issue
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {data?.issues.length === 0 ||
        (!data?.issues.length && <NotFoundComponent />)}
    </>
  );
};

export default UserTicketsTable;
