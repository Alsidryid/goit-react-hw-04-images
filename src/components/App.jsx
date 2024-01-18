import { Component } from "react";
import { searcImages } from "../api/api";
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader"
import Button from './Button/Button'
import Modal from "./Modal/Modal";

export default class App extends Component{
  state = {
    search: '',
    loading: false,
    error: null,
    images: [],
    page: 1,
    total: 0,
    modalOpen: false,
    imageDetails: {}
  }
  
  async componentDidUpdate(_, prevState) {
     const { search, page  } = this.state
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImages()
    }}

  async fetchImages() {
    const { search, page  } = this.state
    try {
          this.setState({
          loading:true
        })
        const { data } = await searcImages(search, page)
        this.setState(({ images}) => ({
          images: data.hits?.length ? [...images, ...data.hits] : images,
          total: data.totalHits
        }))
      }
      catch (error) {
            this.setState({
          error: error.message
        })
        }
      finally {
          this.setState({
          loading:false
        })} 
  }

  handleSearch = ({ search }) => {
    this.setState({
      images: [],
      page: 1,
      total: 0,
      search
  })
}

  loadMore = () => {
    this.setState(({page}) => ({page: page + 1}))
  }
  
  showModal = (largeImageURL) => {
    this.setState({
      modalOpen: true,
      imageDetails: {
        largeImageURL,
      }
    })
  }
  
  closeModal = () => {
    this.setState({
      modalOpen: false,
      imageDetails: {
    }
    })
  }

  render() {
    
    const { images,loading,error, total, modalOpen, imageDetails } = this.state;
    const { handleSearch, loadMore, showModal,closeModal} = this;
    const isImages = Boolean(images.length)
    const isTotal = total !== images.length

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

}