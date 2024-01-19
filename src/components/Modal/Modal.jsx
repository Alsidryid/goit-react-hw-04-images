import { useEffect } from "react";
import { createPortal } from "react-dom";

import style from './Modal.module.css'

const modalRoot = document.getElementById('modal-root')

const Modal = ({close, image}) => {

    const  closeModal = ({target, currentTarget, code}) => {
        if (target === currentTarget || code === "Escape") {
        close()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeModal)
        
        return ()=> document.removeEventListener('keydown', closeModal)
})


    
     return createPortal (
            ( <div onClick={closeModal} className={style.overlay}>
                <div className={style.modal}>
                    <img  className={style.img}src={image.largeImageURL} alt="" />
                </div>
            </div>),
            modalRoot
    )
}
export default Modal