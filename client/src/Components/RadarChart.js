import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";
import { ResponsiveRadar } from '@nivo/radar'



const data = [
  {
    "taste": "fruity",
    "chardonay": 33,
    "carmenere": 118,
    "syrah": 90
  },
  {
    "taste": "bitter",
    "chardonay": 48,
    "carmenere": 116,
    "syrah": 109
  },
  {
    "taste": "heavy",
    "chardonay": 97,
    "carmenere": 44,
    "syrah": 99
  },
  {
    "taste": "strong",
    "chardonay": 80,
    "carmenere": 99,
    "syrah": 81
  },
  {
    "taste": "sunny",
    "chardonay": 118,
    "carmenere": 72,
    "syrah": 73
  }
]

function MyResponsiveRadar(props){


  const useStyles = makeStyles({
    root: {
      maxWidth: 1000,
      minWidth: 100,
      height: 500,
      //paddingBottom: 80
      background: '#3f3b3b',
      color: 'white',
      opacity: 0.90,
      marginBottom: 20,
      marginRight: 10,
      marginLeft: 10
    }
  })

  const lineGraphSettings = {
    theme: {
      fontSize: '14px',
      textColor: "#eee",
      itemTextColor: "#eee",
      tooltip: {
        container: {
        fontSize: "14px",
        color: "black"
        }
      }
    },
    };

  const styles = useStyles();

    //array of the current foods 
  
    function getFoods(data){
      return Object.keys(data).filter(el => el!=="nutrient"&&el!=="max"&&el!=="calories")
    }
    const currentFoods = getFoods(props.data[0])

  
    const fills = ["#DB5375", "#EC9192", "#f8dc88", "#B5BD89", "#729EA1"];

  return(
    <Card className={styles.root} elevation={6}>
    <CardContent><Typography variant="h5">Nutritional distribution</Typography></CardContent>
    <ResponsiveRadar
        data={props.data.slice(1)}
        keys={currentFoods}
        indexBy="nutrient"
        maxValue="auto"
        margin={{ top: 65, right: 80, bottom: 135, left: 80 }}
        padding={0.3}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={false}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={0}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        //colors={{ scheme: 'nivo' }}
        colors={fills}
        //colorBy="id"
        fillOpacity={0.70}
        blendMode="normal"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        theme={lineGraphSettings.theme}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 100,
                itemHeight: 20,
                itemTextColor: 'white',
                symbolSize: 12,
                symbolShape: 'circle',
                itemOpacity: 0.85,
                effects: [
                    {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                        }
                    }
                ]
            }
        ]}
/>
</Card>
) 
}


export default MyResponsiveRadar; 

   