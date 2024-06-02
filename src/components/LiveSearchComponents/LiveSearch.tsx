import { Form, ListGroup, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { searchItems } from "../../api/item";
import SearchStore from "../../store/SearchStore";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import LiveSearchSpinner from "./LiveSearchSpinner";
import LiveSearchNotFound from "./LiveSearchNotFound";

const LiveSearch = observer(() => {
  const { t } = useTranslation();

  const handleSearchItems = async () => {
    try {
        SearchStore.setLoading(true);
        const res = await searchItems(SearchStore.value);
        SearchStore.setSearchResult(res.data);
    } catch (e) { console.error('error', e) }
    SearchStore.setLoading(false);
  }

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    SearchStore.setValue(value);
    if(value.trim() !== '') await handleSearchItems();
    else SearchStore.setSearchResult([]);
  }

  return (
    <div className="search-container ml-10">
      <Form>
        <Form.Control
          type="search"
          placeholder={t("searchPlaceholderNav")}
          className="me-2"
          aria-label="Search"
          onChange={handleOnChange}
          value={SearchStore.value}
        />
      </Form>
      {SearchStore.loading ? (
        <LiveSearchSpinner />
      ) : (
        <ListGroup>
          {SearchStore.searchResult.length === 0 &&
          SearchStore.value.length > 0 ? (
            <LiveSearchNotFound />
          ) : (
            SearchStore.searchResult.map((obj) => (
              <a
                href={`/collections/${obj.collectionId}/item/${obj.id}`}
                style={{ textDecoration: "none" }}
              >
                <ListGroup.Item key={obj.id} className="search-list-item">
                  {obj.name}
                </ListGroup.Item>
              </a>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
})

export default LiveSearch