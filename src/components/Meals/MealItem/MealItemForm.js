import React, { useState } from 'react';
import { useRef } from 'react/cjs/react.development';
import CartContext from '../../../store/cart-context';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({onAddToCart}) => {
  
  const [amountIsValid,setAmountIsValid]=useState(true);
  const amountInputRef=useRef();
  const submitHandler=(e)=>{
    e.preventDefault();
    const enteredAmount=amountInputRef.current.value;
    const enteredAmountNumber=+enteredAmount;
    if (enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5) {
      setAmountIsValid(false);
      return;
    }else if (!amountIsValid) {
      setAmountIsValid(true);
    }
    onAddToCart(enteredAmountNumber);
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input input={{ 
        id:"amount",
        type:"number",
        min:"1",
        max:"5",
        step:"1",
        defaultValue:"1",
       }} 
       label="Amount"
       ref={amountInputRef}
       />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  )
}

export default MealItemForm