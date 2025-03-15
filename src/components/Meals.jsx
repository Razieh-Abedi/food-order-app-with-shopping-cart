import useHttp from "../hooks/useHttp";

import MealItem from "./MealItem";

const mealsUrl = "http://localhost:3000/meals";
const requestConfig = {}

export default function Meals() {

  const { data: mealsData } = useHttp(mealsUrl, requestConfig, []);

  console.log(mealsData);

  return (
    <ul id="meals">
      {mealsData ? (
        mealsData.map((meal) => <MealItem key={meal.id} mealData={meal} />)
      ) : (
        <div>No meals found</div>
      )}
    </ul>
  );
}
