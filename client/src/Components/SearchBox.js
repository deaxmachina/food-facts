import React from "react";
import { Button, Input, Grid } from "@material-ui/core";



function InputButton(props){
  return (
    <div style={{'padding' : '50px'}}>
      <Grid item container direction="column" >
        <Input 
          color="secondary"
          onChange={props.handleUserInput}
          value={props.userInput}
          placeholder="food search (max 5)"
        />
      </Grid>
      <Grid item container direction="column" >
        <Button 
          color="secondary"
          onClick={props.keepFoods}
          >
          Get nutrients 
        </Button>
      </Grid>
    </div>
  )
}

export default InputButton;
