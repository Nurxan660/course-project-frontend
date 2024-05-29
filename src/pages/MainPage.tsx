import '../css/home-page.css'
import RecentItems from '../components/MainPageComponents/RecentItems'
import LargestCollections from '../components/MainPageComponents/LargestCollections'

const HomePage = () => {
  return (
    <>
      <RecentItems />
      <LargestCollections />
    </>
  );
}

export default HomePage