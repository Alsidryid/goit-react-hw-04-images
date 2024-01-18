import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import style from './ImageGallery.module.css'

const ImageGallery = ({ showModal,images }) => {
    
    const elements = images.map(({ id, user,  webformatURL, largeImageURL }) => (
        <ImageGalleryItem
            onClick = {showModal}
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            user={user}
        />
    ))

    return (<ul className={style.gallery}>
                {elements}
            </ul>
        
    )
}

export default ImageGallery