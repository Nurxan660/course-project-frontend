import { PaginationControl } from 'react-bootstrap-pagination-control';
import { usePaginationStore } from '../../context/StoreContext';
import { observer } from 'mobx-react-lite';

const Pagination = observer(() => {
    const store = usePaginationStore();

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
    <PaginationControl
      page={store?.page}
      total={store?.totalPages || 0}
      limit={store?.limit || 15}
      changePage={(page) => {
        store?.setPage(page)
      }}
      ellipsis={1}
    />
    </div>
  );
})

export default Pagination