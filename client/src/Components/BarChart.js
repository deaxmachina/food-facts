import React from "react"
import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";


function MyResponsiveBar(props) {

  const useStyles = makeStyles({
    root: {
      maxWidth: 1000,
      minWidth: 100,
      height: 500,
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
        textColor: "white",
        itemTextColor: "black",
        tooltip: {
                container: {
                fontSize: "14px",
                color: "black"
                }
            },
        },
    };

  //array of the current foods 
  function getFoods(data){
    return Object.keys(data).filter(el => el!=="nutrient"&&el!=="max"&&el!=="calories")
  }
  const currentFoods = getFoods(props.data[0])

  const styles = useStyles();

  const fills = ["#f35588", "#71a95a", "#14b1ab", "#e8505b", "#f9d56e"];
  const colors = { 
    [currentFoods[0]]: "#DB5375", 
    [currentFoods[1]]: "#EC9192", 
    [currentFoods[2]]: "#f8dc88", 
    [currentFoods[3]]: "#B5BD89",
    [currentFoods[4]]: "#729EA1",
  }
  const getColor = bar => colors[bar.id]


  return (
    <Card className={styles.root} elevation={6}>
    <CardContent><Typography variant="h5">Nutritional comparison</Typography></CardContent>
    <ResponsiveBar
        data={props.data.slice(1)}
        keys={currentFoods}
        indexBy="nutrient"
        margin={{ top: 10, right: 110, bottom: 140, left: 70 }}
        padding={0.3}
        //colors={{ scheme: 'nivo' }}
        colors={getColor}
        colorBy="id"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#f8fab8',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: ''
                },
                id: 'dots'
            },
            {
                match: {
                    id: ''
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 7,
            tickPadding: 5,
            tickRotation: -20,
            //legend: 'Nutrients',
            legendPosition: 'middle',
            legendOffset: 45,
            tickColor: "#eee",
        }}
        axisLeft={{
            tickSize: 7,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 12,
                symbolShape: 'circle',
                itemTextColor: 'white',
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
        enableGridY={true}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={lineGraphSettings.theme}
    />
    </Card>
  )
}

export default MyResponsiveBar;