import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, 
} from 'recharts';


// example of data format 
/*
const realData = [
  {nutrient: "calories", apple: 52, banana: 50, kiwi: 61, max: 89},
  {nutrient: "fat", apple: 0.17, banana: 0.33, kiwi: 50.52, max: 0.52},
  {nutrient: "carbs", apple: 13.81, banana: 22.84, kiwi: 74.66, max: 22.84},
  {nutrient: "proteins", apple: 0.26, banana: 81.09, kiwi: 1.14, max: 1.14},
  {nutrient: "fiber", apple: 2.4, banana: 82.6, kiwi: 3, max: 3}
]
*/


const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    minWidth: 200,
    height: 500,
    background: '#3f3b3b',
    color: 'white',
    opacity: 0.90,
  }
})



function MyRadarChart(props) {
    const styles = useStyles();
    const fills = ["#DB5375", "#EC9192", "#f8dc88", "#B5BD89", "#729EA1"]

    //array of the current foods 
    function getFoods(data){
      return Object.keys(data).filter(el => el!=="nutrient"&&el!=="max"&&el!=="calories")
    }
    const currentFoods = getFoods(props.data[0])

    //opacity 

    function handleOpacities(opacity){
      let opacities = [];
      currentFoods.forEach(food => opacities.push([food, opacity]))
      opacities = Object.fromEntries(opacities)
      return opacities
    }
    const startOpacities = handleOpacities(0.8);
    const baseOpacities = handleOpacities(0.4);

    const [opacities, setOpacities] = useState(startOpacities)


    function handleLegendClick(e){
      const { dataKey } = e
      setOpacities({...baseOpacities, [dataKey]: 0.9});
    }

    useEffect(()=>{
      console.log("The data changed")
      setOpacities(baseOpacities)
      console.log(props.data)
    }, [props.data])


    return (    
      <Card className={styles.root} elevation={6}>
        <CardContent><Typography variant="h5">Nutritional distribution</Typography></CardContent>
        <ResponsiveContainer width="99%" height="74%">
            <RadarChart outerRadius={"70%"}  data={props.data.slice(1)} >
              <PolarGrid />
              <PolarAngleAxis dataKey="nutrient" />
              <PolarRadiusAxis angle={30} domain={[0, 20]} />

              {currentFoods.map((food, id) => (
                <Radar key={id} name={food} dataKey={food} fill={fills[id]} fillOpacity={opacities[food]} />))}
r
            {/* 
              <Radar name="Apple" dataKey="apple" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Banana" dataKey="banana" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="Kiwi" dataKey="kiwi" fill="#edb2c2" fillOpacity={0.6} />
            */} 
              <Legend onClick={handleLegendClick}/>
            </RadarChart> 
        </ResponsiveContainer>   
        <CardContent><Typography variant="subtitle2">*click on food in legend</Typography></CardContent>     
      </Card>
      
    );
  }


export default MyRadarChart;

