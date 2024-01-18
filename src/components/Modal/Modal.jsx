import { Component } from "react";
import { createPortal } from "react-dom";

import style from './Modal.module.css'

const modalRoot = document.getElementById('modal-root')

class Modal extends Component{
    componentDidMount() {
    document.addEventListener('keydown', this.closeModal)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = ({target, currentTarget, code}) => {
        if (target === currentTarget|| code === "Escape") {
        this.props.close()
}}
    
    render() {
        const { image } = this.props
        
            const {closeModal} = this
        return createPortal (
            ( <div onClick={closeModal} className={style.overlay}>
                <div className={style.modal}>
                    <img  className={style.img}src={image.largeImageURL} alt="" />
                </div>
            </div>),
            modalRoot
    )
}
}

export default Modal