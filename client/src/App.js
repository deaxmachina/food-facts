import React, {useState} from "react";
import { Paper, Grid, createMuiTheme, ThemeProvider, Box} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SearchBox from "./Components/SearchBox";
import ImgMediaCard from "./Components/ImgMediaCard";
import Chart from "./Components/Chart";
import Header from "./Components/Header";
import MyResponsiveBar from "./Components/BarChart";
import CaloriesChart from "./Components/CaloriesChart";
import RadarChart from "./Components/RadarChart";
import styles from "./App.module.css";
import getData from "./Functionality/api";
import dataTrasform from "./Functionality/data";

//utility function 
function isNotEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return true;
  }
  return false;
}


function App() {

  /* FUNCTIONALITY */

  /*** Data handling functionality ***/

  const [userInput, setUserInput] = useState(""); //user input into the search for food form
  const [foodNames, setFoodNames] = useState([]); //current list of food names
  const [foodData, setFoodData] = useState([]); //current list of food data
  const [selectedFoodData, setSelectedFoodData] = useState([]); //list of selected food data 
  const [foodTransformed, setFoodTransformed] = useState([]);


  // keep track of the current user input into input field
  function handleUserInput(event){
    const input = event.target.value;
    setUserInput(input);
  }

  //get food info button clicked -> get nutrition data from api and save it in foodNames and foodData
  async function keepFoods(){
    try {
      if (foodData.length<5){
        const nutrients = await(getData(userInput));
        if (isNotEmpty(nutrients)){
          if (!foodNames.includes(userInput)){
            setFoodNames(prevItem => {
              return [...foodNames, userInput]
            });
            setFoodData(prevItem => {
              return [...foodData, nutrients]
            })
          } 
        }
      }
    } catch (error) {
      console.log("Missing food")
    }
    setUserInput("");
  };

   // see if the checkbox next to each item is checked 
  // if checked, keep the fooddata in the selectedFoodData state; else delete it from there
  function handleChecked(event, foodId){
    if (event.target.checked){
      keepSelectedFoods(foodId)
    } else {
      setSelectedFoodData(prevItems => {
        return prevItems.filter((item, index) => {
          const currentFood = foodNames[foodId];
          const currentFoodData = foodData.find(x => x.food === currentFood);
          return item !== currentFoodData;
        });
      });
    };
  };

  //keep list of clicked (checked) foods, without repetition
  function keepSelectedFoods(foodId) {
    const currentFood = foodNames[foodId];
    const currentFoodData = foodData.find(x => x.food === currentFood);
    setSelectedFoodData(prevItems => {
      if (!prevItems.includes(currentFoodData)){
        return [...prevItems, currentFoodData]
      } else {
        return prevItems
      }
    });
  };

  // transform the data into format expected by chart
  function handleDataTransform(){
    console.log(selectedFoodData)
    const foodDataTransformed = dataTrasform(selectedFoodData)
    setFoodTransformed(foodDataTransformed);
  }  

  //clear all the stored food data on clicking "clear table"
  function handleClearTable(){
    setFoodData([])
    setFoodNames([])
    setSelectedFoodData([])
    setFoodTransformed([])
  };

  /* THEME */

  const [darkMode, setDarkMode] = useState(true); 
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const useStyles = makeStyles({
    root: {
      margin: 0,
      padding: 0,
      height: "100%",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
  });

  const classes = useStyles();



  return(
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} square={true} elevation={0} >
        <Grid container justify="center" alignItems="center"  direction="row" spacing={0}>

          <Grid item xs={12}>
            <Header 
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </Grid>

          <Grid item container justify="center" alignItems="center" xs={11} sm={11} md={12}>
            <SearchBox 
              handleUserInput={handleUserInput}
              userInput={userInput}
              keepFoods={keepFoods}
            />
          </Grid>

          <Grid item container justify="center" xs={11} sm={11} md={12}>
              <ImgMediaCard 
                data={foodData}
                handleChecked={handleChecked}
                handleDataTransform={handleDataTransform}
                handleClearTable={handleClearTable}
                image={"https://images.unsplash.com/photo-1506395308321-904a71783d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"}
              />
          </Grid>



        {isNotEmpty(foodTransformed)? 
        <Grid container justify="center"  > 
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <MyResponsiveBar data={foodTransformed}/>
          </Grid>
          <Grid item xs={11} sm={11} md={5} lg={4}>
            <RadarChart data={foodTransformed}/>
          </Grid>
          <Grid item xs={11} sm={11} md={10} lg={8}>
            <CaloriesChart data={foodTransformed}/>
          </Grid>
        </Grid> : null}    

          


        </Grid>
      </Paper>
    </ThemeProvider>
  )
};


//<Paper styles={{color: 'blue'}}>xs=12</Paper>
//{isNotEmpty(foodTransformed)? <Grid item xs={10} sm={8} md={5}><Chart data={foodTransformed} /></Grid> : null}     

export default App; 