import React from 'react'
import { Table } from 'react-bootstrap'

const CollectionsTable = () => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td className='center-icons'>
            <i className="bi bi-trash cursor-pointer"></i>
            <i className="bi bi-pencil cursor-pointer ml-10"></i>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default CollectionsTable