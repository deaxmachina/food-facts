import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from "./Table";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    minWidth: 100,
    background: '#3f3b3b',
    color: 'white',
    opacity: 0.90,
    marginBottom: 60,
    marginRight: 10,
    marginLeft: 10,
  },
  content: {
    maxHeight: 350,
    overflow: 'auto'
  },
  media: {
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      opacity: 0.8,
    },

});


function ImgMediaCard(props) {
  const styles = useStyles();

  return (
    <Card className={styles.root} elevation={6}>
      <CardActionArea>
        <CardMedia className={styles.media}
          component="img"
          alt="food image"
          height="200"
          image={props.image}
          title="Foods"
        />
        <CardContent className={styles.content} >
          <Typography gutterBottom variant="h5" component="h2">
            Foods
          </Typography>
          <Table 
            data={props.data}
            handleChecked={props.handleChecked}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={props.handleDataTransform} disableElevation variant="contained" size="small" color="secondary">
          Visualise
        </Button>
        <Button onClick={props.handleClearTable} disableElevation variant="outlined" size="small" color="default">
          Clear table
        </Button>
      </CardActions>
    </Card>
  );
}


export default ImgMediaCard;