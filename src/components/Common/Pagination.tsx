import { PaginationControl } from 'react-bootstrap-pagination-control';
import { usePaginationStore } from '../../context/StoreContext';
import { observer } from 'mobx-react-lite';

const Pagination = observer(() => {
    const store = usePaginationStore();

  return (
    <PaginationControl
      page={store?.page}
      total={store?.totalPages || 0}
      limit={15}
      changePage={(page) => {
        store?.setPage(page)
      }}
      ellipsis={1}
    />
  );
})

export default Pagination