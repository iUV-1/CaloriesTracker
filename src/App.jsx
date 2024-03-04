import { useState, useLayoutEffect } from "react";
import Papa from "papaparse";
import { FoodTable } from "./FoodTable";

function App({FoodHall}) {
  const [FoodList, setFoodList] = useState({});
  const [selectedDate, setSelectedDate] = useState(Object.keys(FoodList)[0]);

  const handleFoodList = (FoodList) => {
    setFoodList(FoodList);
    setSelectedDate(Object.keys(FoodList)[0]); // ensure the data is loaded after loading
  };

  const DocumentID = "1VcnhquTyT3qxWLBSEOufZidCa4FL_vFPY5KH6wQSI_U";
  const SheetID2 = {
    Holden: "0",
    Holmes: "774773164",
    Brody: "306627525",
    Case: "1016218533",
  };

  const fetchCalories2 = async () => {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${DocumentID}/export?format=csv&gid=${SheetID2[FoodHall]}`
    );
    const data = await response.text();

    var parsedData = Papa.parse(data).data;
    parsedData.shift(); // remove the header

    let activeDateIndex = "";
    /* Expected data:
      FoodList = {
        <Date> = [
           {Name: "Food Name", Calories: 100,...},
           ...
        ]
      }
    */
    let FoodList = {};

    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i][0].includes("Date")) {
        activeDateIndex = parsedData[i][0].toString();
      } else {
        if (activeDateIndex in FoodList) {
          FoodList[activeDateIndex].push({
            Name: parsedData[i][0],
            Calories: parsedData[i][1],
            Fat: parsedData[i][2],
            Carbs: parsedData[i][3],
            Protein: parsedData[i][4],
          });
        } else {
          FoodList[activeDateIndex] = [
            {
              Name: parsedData[i][0],
              Calories: parsedData[i][1],
              Fat: parsedData[i][2],
              Carbs: parsedData[i][3],
              Protein: parsedData[i][4],
            },
          ];
        }
      }
    }

    console.log("FoodList", FoodList);
    console.log("FoodList keys", Object.keys(FoodList));
    return FoodList;
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      const data = await fetchCalories2();
      handleFoodList(data);
    };

    fetchData();
    for (var i = 0; i < Object.keys(FoodList).length; i++) {
      console.log("FoodList[i]", FoodList[i]);
    }
  }, []);

  const handleDropdownChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <>
      <p>{FoodHall}</p>
      <p>Select a Date</p>
      <select value={selectedDate} onChange={handleDropdownChange}>
        {Object.keys(FoodList).map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      {console.log("FoodList", FoodList)}
      <FoodTable DiningHallDate={selectedDate} FoodList={FoodList} />
    </>
  );
}

export default App;
