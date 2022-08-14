import React from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({}) => {
  return (
    <form className={styles.form}>
      <Input input={{ 
        id:"amount",
        type:"number",
        min:"1",
        max:"5",
        step:"1",
        defaultValue:"1",
       }} 
       label="Amount"
       />
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm