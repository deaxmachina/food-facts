import React from "react"
import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";

const data = [
  {
    "country": "AD",
    "hot dog": 37,
    "burger": 159,
    "sandwich": 169,
    "kebab": 15,
    "fries": 148,
  }]


function MyResponsiveBar(props) {

  const useStyles = makeStyles({
    root: {
      maxWidth: 1200,
      minWidth: 200,
      height: 150,
      paddingBottom: 15,
      marginBottom: 100,
      marginRight: 10,
      marginLeft: 10,
      background: '#3f3b3b',
      paddingTop: 0,
      color: 'white',
      opacity: 0.90
    }
  })
  const styles = useStyles();



    //array of the current foods 
    function getFoods(data){
      return Object.keys(data).filter(el => el!=="nutrient"&&el!=="max")
    }
    const currentFoods = getFoods(props.data[0])
  
    const fills = ["#f35588", "#71a95a", "#14b1ab", "#e8505b", "#f9d56e"];
    const colors = { 
      [currentFoods[0]]: "#DB5375", 
      [currentFoods[1]]: "#EC9192", 
      [currentFoods[2]]: "#f8dc88", 
      [currentFoods[3]]: "#B5BD89",
      [currentFoods[4]]: "#729EA1",
    }
    const getColor = bar => colors[bar.id]

  
    const lineGraphSettings = {
      theme: {
      fontSize: '14px',
      textColor: "#eee",
      itemTextColor: "#eee",
      tooltip: {
        container: {
        fontSize: "14px",
        color: "black"
        }}
      },
      };

  return (
    <Card className={styles.root} elevation={6}>
    <CardContent><Typography variant="h5">Calories</Typography></CardContent>
    <ResponsiveBar
        data={props.data.slice(0,1)}
        keys={currentFoods}
        indexBy="nutrient"
        margin={{ top: 0, right: 15, bottom: 50, left: 15 }}
        padding={0.5}
        layout="horizontal"
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
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={null}

        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemTextColor: 'white',
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={lineGraphSettings.theme}
    />
    </Card>
  )
}

export default MyResponsiveBar;