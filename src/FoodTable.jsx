import { useState } from "react";

export const FoodTable = ({ DiningHallDate, FoodList }) => {
  const FoodListForDate = FoodList[DiningHallDate];
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedFoodIndex, setSelectedFoodIndex] = useState([]);

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  //const [foodQuantity, setFoodQuantity] = useState([]);

  const handleAddButton = (index) => {
    setSelectedFood([...selectedFood, FoodListForDate[index]]);
    setSelectedFoodIndex([...selectedFoodIndex, index]);

    setTotalCalories(totalCalories + Number(FoodListForDate[index].Calories));
    setTotalFat(totalFat + Number(FoodListForDate[index].Fat));
    // they are % so we need to trim the percent sign
    setTotalCarbs(totalCarbs + parseFloat(FoodListForDate[index].Carbs));
    setTotalProtein(totalProtein + parseFloat(FoodListForDate[index].Protein));

    console.log(
      "Supposed food log",
      totalCalories,
      totalFat,
      totalCarbs,
      totalProtein
    );
    console.log("Selected Food: ", selectedFood);
    console.log("Selected Food Index: ", selectedFoodIndex);
  };

  const handleRemoveButton = (index) => {
    let newSelectedFood = selectedFood.filter((food, i) => i !== index);
    let newSelectedFoodIndex = selectedFoodIndex.filter((food, i) => i !== index);

    setSelectedFood(newSelectedFood);
    setSelectedFoodIndex(newSelectedFoodIndex);

    setTotalCalories(
      totalCalories - Number(selectedFood[index].Calories)
    );
    setTotalFat(totalFat - Number(selectedFood[index].Fat));
    setTotalCarbs(totalCarbs - parseFloat(selectedFood[index].Carbs));
    setTotalProtein(totalProtein - parseFloat(selectedFood[index].Protein));

    console.log(
      "Supposed food log",
      totalCalories,
      totalFat,
      totalCarbs,
      totalProtein
    );
    console.log("Selected Food: ", selectedFood);
    console.log("Selected Food Index: ", selectedFoodIndex);
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Add</th>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Calories</th>
            <th scope="col">Fat</th>
            <th scope="col">Carbs</th>
            <th scope="col">Protein</th>
          </tr>
        </thead>
        <tbody>
          {FoodListForDate &&
            FoodListForDate.map((food, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="button"
                      value="+"
                      onClick={() => handleAddButton(index)}
                    />
                  </td>
                  <th scope="row">{index}</th>
                  <td>{food.Name}</td>
                  <td>{food.Calories}</td>
                  <td>{food.Fat}</td>
                  <td>{food.Carbs}</td>
                  <td>{food.Protein}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Remove</th>
            <th scope="col">Name</th>
            <th scope="col">Calories</th>
            <th scope="col">Fat</th>
            <th scope="col">Carbs</th>
            <th scope="col">Protein</th>
          </tr>
        </thead>
        <tbody>
          {selectedFood &&
            selectedFood.map((food, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="button" value="remove" 
                    onClick={() => {handleRemoveButton(index)}}/>
                  </td>
                  <td>{food.Name}</td>
                  <td>{food.Calories}</td>
                  <td>{food.Fat}</td>
                  <td>{food.Carbs}</td>
                  <td>{food.Protein}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td>TOTAL</td>
            <td>{totalCalories}</td>
            <td>{totalFat}</td>
            <td>{totalCarbs}%</td>
            <td>{totalProtein}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
