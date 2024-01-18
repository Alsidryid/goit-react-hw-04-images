import style from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ onClick, webformatURL, largeImageURL, user}) => (<li onClick = {() => onClick({largeImageURL})} className={style.item}>
  <img className={style.image} src={webformatURL}  alt={user} /></li>)

 export default ImageGalleryItem