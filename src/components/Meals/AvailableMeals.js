import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null);
    useEffect(()=>{
      const fetchMeals=async()=>{
        // setIsLoading(true);
        const response=await fetch('https://react-http-2585b-default-rtdb.firebaseio.com/meals.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data=await response.json();
        console.log(data);
        const loadedMeals=[];
        for (const key in data) {
          loadedMeals.push({
            id:key,
            name:data[key].name,
            description:data[key].description,
            price:data[key].price,
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }

      fetchMeals().catch((err)=>{
        setIsLoading(false);
        setHttpError(err.message);
      });
    
    },[])
    const mealsList=meals.map((meal)=>{
        return <MealItem name={meal.name} description={meal.description} price={meal.price} id={meal.id} key={meal.id}/>
    })
    // console.log(isLoading);
    // console.log(httpError);
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !httpError && <ul>{mealsList}</ul>}
        {httpError && <p>{httpError}</p>}
      </Card>
        
    </section>
  )
}

export default AvailableMeals