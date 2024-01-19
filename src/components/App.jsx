 import { useEffect, useState } from "react";
import { searcImages } from "../api/api";
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from './Button/Button';
import Modal from "./Modal/Modal";


const App = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModal] = useState(false);
  const [imageDetails, setDetails] = useState({});


  useEffect(() => {
  const fetchImages = async  () =>  {
    try {
      setLoading(true);
      const { data } = await searcImages(search, page)
      setImages(prevImages => data.hits?.length ? [...prevImages, ...data.hits] : prevImages);
      setTotal(data.totalHits)
      }
    catch (error) {
      setError(error.message)
        }
      finally {
      setLoading(false)
    }
    }
    if (search) {
      fetchImages()
    }
}, [search, page] )


  const  handleSearch = ({ search }) => {
    setSearch(search);
    setPage(1);
    setTotal(0);
    setImages([]);
}
  
  const loadMore = () => setPage(prevPage => prevPage + 1);
  
  const showModal = (largeImageURL) => {
    setModal(true);
    setDetails({
      largeImageURL,
    });
  }
  
  const closeModal = () => {
    setModal(false);
    setDetails({});
  }



  const isImages = Boolean(images.length);
  const isTotal = total !== images.length;

    return (
      <>
        <Searchbar onSubmit={handleSearch} />
        {error && <p> {error}, please try later.</p>}
        {isImages && <ImageGallery showModal={showModal} images={images} />}
        {loading && <Loader/>}
        {isImages && isTotal && <Button onClick={loadMore} type=" button">Load more</Button>}
        {modalOpen && <Modal close={closeModal} image={imageDetails.largeImageURL} />}
      </>
  )
}

export default App