import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

/* example expected data format
const dataRaw = [
  { id:0, name: 'Frozen yoghurt', calories: 159, fat: 5, carbs: 85, protein:34, fiber: 10 },
  { id:1, name: 'Ice cream sandwich', calories: 237, fat: 33, carbs: 23, protein: 100, fiber: 20 },
  { id:2, name: 'Eclair', calories: 262, fat: 4, carbs: 45, protein:6, fiber: 30 }
]
*/


const useStyles = makeStyles({
  table: {
    minWidth: 200,
    borderBottom: "none",
  },
});



function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer>

      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>100g serving</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Fiber&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, id) => (
            <TableRow key={row.food}>
              <TableCell style={{ minWidth: "110px", minWidth: "200px", padding: "5px" }} component="th" scope="row" padding="checkbox">
                <Checkbox 
                  style={{padding: "10px"}}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  name={row.food}
                  onChange={(e) => props.handleChecked(e, id)}
                />                
                {row.food}
              </TableCell>
              <TableCell align="right">{row.ENERC_KCAL}</TableCell>
              <TableCell align="right">{row.FAT}</TableCell>
              <TableCell align="right">{row.CHOCDF}</TableCell>
              <TableCell align="right">{row.PROCNT}</TableCell>
              <TableCell align="right">{row.FIBTG}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};


export default DenseTable;