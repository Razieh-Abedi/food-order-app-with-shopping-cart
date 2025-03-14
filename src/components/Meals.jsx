import React, { useState, useEffect } from "react";

import MealItem from "./MealItem";

export default function Meals() {
  const [mealsData, setMealsData] = useState([]);

  const mealsUrl = "http://localhost:3000/meals";
  useEffect(() => {
    async function fetchMealsData() {
      try {
        const response = await fetch(mealsUrl);
        if (!response.ok) {
            throw new Error(`http error status: ${error.status}`)
        }
        const result = await response.json();

        setMealsData(result);
      } catch (error) {
        console.log("error fetching meals data", error);
      }
    }

    fetchMealsData();
  }, [mealsUrl]);

 

  return (
    <ul id="meals">
      {mealsData ? (
        mealsData.map((meal) => <MealItem key={meal.id} mealData={meal}/>)
      ) : (
        <div>No meals found</div>
      )}
    </ul>
  );
}
