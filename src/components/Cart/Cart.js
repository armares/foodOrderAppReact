import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({onHideCart}) => {
    const [isCheckout,setIsCheckout]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);
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
    const orderHandler=()=>{
       setIsCheckout(true);
    }
    const submitOrderHandler= async(userData)=>{
        setIsSubmitting(true);
        const response=await fetch('https://react-http-2585b-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderItems:cartCtx.items,
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
  return (
    <Modal onHideCart={onHideCart}>
        {!isSubmitting && !didSubmit && <React.Fragment>
            {cartCtx.items.length!==0 && cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onSubmitOrder={submitOrderHandler} onHideCart={onHideCart}/>}
            {!isCheckout &&
            <div className={styles.actions}>
                <button onClick={onHideCart} className={styles['button--alt']}>Close</button>
                {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
            </div>
            }
        </React.Fragment>}

        {isSubmitting && <p>Sending order data...</p>}
        {didSubmit && 
        <React.Fragment>
            <p>Succesfully sent the order!</p>
            <div className={styles.actions}>
                <button onClick={onHideCart} className={styles['button--alt']}>Close</button>                
            </div>
        </React.Fragment>
        }
    </Modal>
  )
}

export default Cart