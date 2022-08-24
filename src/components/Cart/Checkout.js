import React, { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty=value=>value.trim()==='';
const isFiveChars=value=>value.trim().length ===5;

const Checkout = ({onHideCart, onSubmitOrder}) => {
    const [formInputsValidity,setFormInputsValidity]=useState({
        name:true,
        street:true,
        postal:true,
        city:true,
    });

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();
    const confirmHandler=(e)=>{
        e.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostal=postalInputRef.current.value;
        const enteredCity=cityInputRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredPostalIsValid=isFiveChars(enteredPostal);
        const enteredCityIsValid=!isEmpty(enteredCity);
        
        setFormInputsValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postal:enteredPostalIsValid,
            city:enteredCityIsValid,
        })

        const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        if (!formIsValid) {
            return;
        }

        onSubmitOrder({
            name:enteredName,
            street:enteredStreet,
            postal:enteredPostal,
            city:enteredCity,
        });
    }
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
        <div className={`${styles.control} ${!formInputsValidity.name ? styles.invalid:''}`}>
            <label htmlFor='name'>Your name</label>
            <input ref={nameInputRef} type='text' id='name' />
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={`${styles.control} ${!formInputsValidity.street ? styles.invalid:''}`}>
            <label htmlFor='street'>Your street</label>
            <input ref={streetInputRef} type='text' id='street' />
            {!formInputsValidity.street && <p>Please enter a valid street</p>}
        </div>
        <div className={`${styles.control} ${!formInputsValidity.postal ? styles.invalid:''}`}>
            <label htmlFor='postal'>Your postal code</label>
            <input ref={postalInputRef} type='text' id='postal' />
            {!formInputsValidity.postal && <p>Please enter a valid postal code</p>}
        </div>
        <div className={`${styles.control} ${!formInputsValidity.city ? styles.invalid:''}`}>
            <label htmlFor='city'>Your city</label>
            <input ref={cityInputRef} type='text' id='city' />
            {!formInputsValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={styles.actions}>
            <button type='button' onClick={onHideCart}>Cancel</button>
            <button className={styles.submit}>Confirm</button>
        </div>
    </form>
  )
}

export default Checkout