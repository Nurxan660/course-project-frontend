import '../css/home-page.css'
import RecentItems from '../components/MainPageComponents/RecentItems'
import LargestCollections from '../components/MainPageComponents/LargestCollections'
import PopularTag from '../components/MainPageComponents/PopularTag'

const HomePage = () => {
  return (
    <>
      <RecentItems />
      <LargestCollections />
      <PopularTag />
    </>
  );
}

export default HomePage