import axios from "axios";

//api creds - to move! 
const appId = "2b9c56f8"
const apiKey = "4b2d3c98a882d580d432b28e9fd6c748"

//fetch the raw api data 
async function getData(foodName){
  try {
    const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=${appId}&app_key=${apiKey}`;
    const {data: rawData} = await axios.get(apiUrl);
    console.log(rawData)
    const {text: foodLabel, parsed} = rawData
    const [{food: {nutrients}}] = parsed 
    return {food: foodLabel, ...nutrients};
  } catch (error) {
    console.log(error);    
    return {}; 
  }
};

export default getData; 