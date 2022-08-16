import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const Cart = ({onHideCart}) => {
    const cartCtx=useContext(CartContext);
    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item,amount:1});
    }
    const cartItemRemoveHandler=(id)=>{
        cartCtx.removeItem(id);
    }
    const cartItems=<ul className={styles['cart-items']}>
        {
            cartCtx.items.map((item) => {
                return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onCartAdd={cartItemAddHandler.bind(null,item)} onCartRemove={cartItemRemoveHandler.bind(null,item.id)}/>
              }
              )
        }
    </ul>;
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length>0;
    // const cartItems=cartCtx.items.map((item)=>{
    //     const array=[];
    //     if (!array.includes(item.name)) {

    //         return;
    //     }
    //     array.push(item);
    //     return item;
    // })
  return (
    <Modal onHideCart={onHideCart}>
        {/* {cartCtx.items.length!==0 && 
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item)=>{
                return <li key={item.id}>{item.name}</li>
            })}
        </ul>
        } */}
        {cartCtx.items.length!==0 && cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button onClick={onHideCart} className={styles['button--alt']}>Close</button>
            {hasItems && <button className={styles.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart