import { Table, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AdminStore from "../../store/AdminStore";
import { getListOfUsers } from "../../api/admin";
import { usePaginationStore } from "../../context/StoreContext";

const AdminTable = observer(() => {
  const paginationStore = usePaginationStore();

  const loadUsers = async () => {
    try {
      const res = await getListOfUsers(paginationStore?.page || 1);
      AdminStore.setUsers(res.data);
      paginationStore?.setTotalPages(res.data.totalItems);
    } catch (e) {}
  };

  useEffect(() => {
    loadUsers();
  }, [paginationStore?.page, AdminStore.isAction]);

  return (
    <Table responsive="sm" striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check onClick={() => AdminStore.handleUserCheckAll()} />
          </th>
          <th>Имя</th>
          <th>Email</th>
          <th>Админ</th>
        </tr>
      </thead>
      <tbody>
        {AdminStore.userListReponse.users.map((user) => (
          <tr key={user.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={AdminStore.checkedUsers.includes(user.id)}
                onChange={() => AdminStore.handleUserCheck(user.id)}
              />
            </td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.role === "ROLE_ADMIN" ? "Да" : "Нет"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default AdminTable;
