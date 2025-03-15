import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const mealsUrl = "http://localhost:3000/meals";
const requestConfig = {};

export default function Meals() {
  const {
    data: mealsData,
    isLoading,
    error,
  } = useHttp(mealsUrl, requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals!" message={error} />;
  }

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
