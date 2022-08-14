import React from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';

const Cart = ({onHideCart}) => {
    const cartItems=<ul className={styles['cart-items']}>
        {
            [{id:'c1',name:'Sushi',amount:2,price:12.99}].map((item) => {
                return <li key={item.id}>{item.name}</li>
              }
              )
        }
    </ul>;
  return (
    <Modal onHideCart={onHideCart}>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>$35.62</span>
        </div>
        <div className={styles.actions}>
            <button onClick={onHideCart} className={styles['button--alt']}>Close</button>
            <button className={styles.button}>Order</button>
        </div>
    </Modal>
  )
}

export default Cart