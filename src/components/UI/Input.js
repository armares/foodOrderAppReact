import React from 'react';
import styles from './Input.module.css';

const Input = ({label,input}) => {
  return (
    <div className={styles.input}>
        <label htmlFor={input.id}>{label}</label>
        <input id={input.id} {...input}/>
    </div>
  )
}

export default Input