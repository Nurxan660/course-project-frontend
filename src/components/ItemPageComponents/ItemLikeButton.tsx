import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import ItemStore from '../../store/ItemStore';
import { toggleLike } from '../../api/likes';
import { useParams } from 'react-router-dom';

const ItemLikeButton = observer(() => {
  const params = useParams();

  const handleToggleLike = async () => {
    try {
      await toggleLike(Number(params.itemId));
      ItemStore.setLiked(!ItemStore.liked)
      ItemStore.changeLikeCount();
    } catch (e) { }
  };

  return (
    <div className="d-flex align-items-center">
      <Button variant="light" onClick={handleToggleLike} className="p-2 me-2">
        <i
          className={`bi ${ItemStore.liked ? "bi-heart-fill" : "bi-heart"}`}
          style={{ color: ItemStore.liked ? "red" : "gray" }}
        ></i>
      </Button>
      <span>{ItemStore.item.likesCount}</span>
    </div>
  );
})

export default ItemLikeButton