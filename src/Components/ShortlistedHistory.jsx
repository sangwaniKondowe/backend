import React ,{useEffect, useState}from 'react'
import {PageHeader} from './Common/CommonComponents'
import {Box, Button} from '@material-ui/core'
import {Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    TableRowPaper,TableRow,Grid} from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import {useStyles} from './BodyStyles'
import axios from 'axios'
/* A function that is called when the user clicks on the select element. */
function History() {
  const classes = useStyles();

 
  const [data, setData] = useState([])
  const [selected, setSelected] = useState("2022");

  useEffect(()=>{
    getApplicantsInAYear(selected)
  }, [])


  const getApplicantsInAYear= (year)=>{
    
    const Url = "http://localhost:5000/application/getPrev?year="+ year
    axios.get(Url)
    .then(response => {  
     setData(response.data)
     console.log(response.data)
    })
  }

 const year = (new Date()).getFullYear();
  var years= []
    for(var i=2019; i<=year; i++) {
        years.push(i)
    }


    const  handleChange = (event) => {
      setSelected(event.target.value);
      console.log("Selected :"+selected + "Target : "+event.target.value)
      getApplicantsInAYear(event.target.value)
    }
    
 
 
  return (
    <div>
<Box>


<FormControl>
      <InputLabel htmlFor="agent-simple">Year</InputLabel>
      <Select
        value={selected}
        onChange={handleChange}
        inputProps={{
          name: "year",
          id: "year-simple"
        }}
        
        fullWidth
      >
        {years.map((year, index) => {
          return <MenuItem key={index} value={year}>{year}</MenuItem>;
        })}
      </Select>
    </FormControl>

    
  
     
    </Box>

    total previous shortlisted
    {data.map((num) => (
      <h3 style={{color:'red'}}>{num.totalShortlisted}</h3>
    ))}
   <Box>
        <PageHeader pageTitle="previous Shortlisted"/>

        <TableContainer className={classes.tableContainer} >
<Table className={classes.table} aria-label="simple table">
  <TableHead >
    <TableRow>
      <TableCell className={classes.tableHeard}>First Name</TableCell>
      <TableCell className={classes.tableHeard} >Last Name</TableCell>
      <TableCell className={classes.tableHeard}>Gender</TableCell>
      <TableCell className={classes.tableHeard} >Year Of Study</TableCell>
    
      
    </TableRow>
  </TableHead>
  <TableBody>
    {/* the table showing students details */}
    {data.map((row) => (
      <TableRow key={row.id}>
        
        <TableCell >{row.firstname}</TableCell>
        <TableCell >{row.lastname}</TableCell>
        <TableCell >{row.gender}</TableCell>
        <TableCell >{row.yrofstudy}</TableCell>
      
        
        
        
      </TableRow>
    ))} 
  </TableBody>
  
</Table>
</TableContainer>
   </Box>
    </div>
  )
}

export default History