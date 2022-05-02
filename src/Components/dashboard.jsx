import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, CardContent, Card } from '@material-ui/core'
import { useStyles } from './BodyStyles'
import { PageHeader } from './Common/CommonComponents'

import CommonGraphComponents from './Common/CommonGraphComponents';
import { useNavigate } from 'react-router-dom';
import { Bar} from 'react-chartjs-2';
import DataAnalytics from './DataAnalytics'
import axios from 'axios';


import BeneficiaryHistory from './BeneficiaryHistory';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import {Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  TableRowPaper,TableRow} from '@material-ui/core';

function Dashboard() {

  const navigate = useNavigate()


  const classes = useStyles();


  
 
 
 const baseDataUrl = "http://localhost:5000/application/countAll"

 
 const [data ,setData] = useState([])
 
/**
 * I'm using the useEffect hook to call the countingAppications function, which is an async function
 * that uses axios to get data from an API. 
 * 
 * The data is then set to the state variable "data" using the setData function. 
 * 
 
 */

 const [selected, setSelected] = useState("2022");

 useEffect(()=>{
   getApplicantsInAYear(selected)
 }, [])


 const getApplicantsInAYear= (year)=>{
   
   const Url = "http://localhost:5000/application/getPreApp?year="+ year
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
      
      <div style = {{}} >

    

        <PageHeader label="Dashboard" pageTitle="Scholarship Overview" />
        
        <FormControl  >
      <InputLabel htmlFor="agent-simple">Year</InputLabel>
      <Select
        value={selected}
        onChange={handleChange}
        inputProps={{
          name: "year",
          id: "year-simple"
        }}
        
        
      >
        {years.map((year, index) => {
          return <MenuItem key={index} value={year}>{year}</MenuItem>;
        })}
      </Select>
    </FormControl>

    </div>
        <Grid container spacing={2}>

          <Grid item xs={6} sm={4}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                  Total applications

                  </Typography>

                 
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>
                  {data.map((num) => (
      <h3 style={{color:'red'}}>{num.totalApplications}</h3>
    ))}

                  </Typography>
                </CardContent>


              </Card>

            </Grid>


            <Grid item xs={6} sm={4}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                   total female applicants

                  </Typography>

               
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>

                  {data.map((num) => (
      <h3 style={{color:'red'}}>{num.totalFemales}</h3>
    ))}
               
                  </Typography>
                </CardContent>


              </Card>

            </Grid>

            <Grid item xs={6} sm={4}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                  total male applicants 

                  </Typography>

                
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>

                  {data.map((num) => (
      <h3 style={{color:'red'}}>{num.totalMales}</h3>
         ))}

                  

                  </Typography>
                </CardContent>


              </Card>

            </Grid>





            <Grid item xs={8} sm={8}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                   Total Applicants

                  </Typography>

                
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>

                
                  <TableContainer className={classes.tableContainer} >
<Table className={classes.table} aria-label="simple table">
  <TableHead >
    <TableRow>
      <TableCell className={classes.tableHeard}>First Name</TableCell>
      <TableCell className={classes.tableHeard} >Last Name</TableCell>
      <TableCell className={classes.tableHeard}>Gender</TableCell>
      <TableCell className={classes.tableHeard} >Reg Number</TableCell>
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
        <TableCell >{row.regNum}</TableCell>
        <TableCell >{row.yrofstudy}</TableCell>
        
        
        
        
      </TableRow>
    ))} 
  </TableBody>
  
</Table>
</TableContainer>

                  </Typography>
                </CardContent>


              </Card>

            </Grid>



            </Grid>
        
          

            



    </div>
  );

  }
export default Dashboard
