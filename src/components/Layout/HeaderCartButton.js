import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';

const HeaderCartButton = ({onShowCart}) => {
  const [btnIsHighlighted,setBtnIsHighlighted]=useState(false);
  const cartCtx = useContext(CartContext);
  const {items}=cartCtx;
  const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{
    return curNumber+ item.amount;
  },0);
  const btnClasses=`${classes.button} ${btnIsHighlighted ? classes.bump:''}`;
  useEffect(()=>{
    if (items.length===0) {
      return;
    }
    setBtnIsHighlighted(true);
    const time=setTimeout(()=>{
      console.log('ciao');
      setBtnIsHighlighted(false);
    },100);
    return ()=>{
      clearTimeout(time);
    }
  },[items]);
  return (
    <button onClick={onShowCart} className={btnClasses}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>
            Your Cart 
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
  )
}

export default HeaderCartButton