import React, { Fragment } from 'react';
import styles from './Modal.module.css';
import  ReactDOM  from 'react-dom';


const Backdrop = ({onHideCart}) => {
  return (
    <div className={styles.backdrop} onClick={onHideCart}/>
  )
}
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
  )
}

const Modal = ({children,onHideCart}) => {
  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onHideCart={onHideCart}/>,document.getElementById('backdrop'))}
        {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>,document.getElementById('overlays'))}
    </Fragment>
  )
}

export default Modal