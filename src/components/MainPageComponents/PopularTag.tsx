import React, { useEffect, useState } from 'react'
import { TagCloud } from 'react-tagcloud';
import { getPopularTags } from '../../api/tag';
import { PopularTag as PopularTagType} from '../../types/PopularTag';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PopularTag = () => {
    const [data, setData] = useState<PopularTagType[]>([]);
    const { t } = useTranslation();

    const loadTags = async () => {
        try {
            const res = await getPopularTags();
            setData(res.data);
        } catch (e) { console.error("error when loading tags") }
    }

    useEffect(() => {
        loadTags();
    }, [])


  return (
    <Container>
      <h2>{t("popularTagsLabel")}</h2>
      <Row>
      <TagCloud minSize={12} maxSize={35} tags={data} />
      </Row>
    </Container>
  )
}

export default PopularTag