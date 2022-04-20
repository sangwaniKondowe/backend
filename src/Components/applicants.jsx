import React, { useEffect, useState } from 'react'
import {PageHeader} from './Common/CommonComponents'

import { Button,TextField,Grid} from '@material-ui/core'
import {Box} from '@material-ui/core'
import {useStyles} from './BodyStyles'




import {Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRowPaper,TableRow} from '@material-ui/core';
import axios from 'axios'
import PendingApplications from './PendingApplications'




// this function recieves applicants data from api which the admin will use it for selection

function Applicants() {
    const classes = useStyles();
    const [data , setData] = useState([])
    const [numberMale, setNumberMales] = useState(0)
    const [numberFemale, setNumberFemale] = useState(0)
    const token = localStorage.getItem("accessToken")
    const userToken = JSON.parse(token)
    const valid_token = userToken.token
      
    
  
    // this function handle submission of the creteria which admin will use for the seletion
    const handleSubmit = (event) => {
      event.preventDefault();

    //endpoint for the selection process
    const getBeneUrl = "http://localhost:5000/application/markComplete?females="+numberFemale+"&males="+numberMale
     
    axios.get(getBeneUrl,{

      
      headers: {
        'Authorization': 'Bearer ' + valid_token
        }
    })

    .then(response => {
      
      setData(response.data.complete)
      console.log(response)
      
    })
   }
    
  const handelMales =(e)=>{
e.preventDefault()
setNumberFemale(e.target.value)
  }

  const handleFemales =(e) => {
    e.preventDefault()
    setNumberMales(e.target.value)
  }
    return (
        <div>

        
       <Box>
        <PageHeader pageTitle="All Applicants"/>
        {/* Selection form  */}
        <form onSubmit={handleSubmit}>
          
          <Grid container className={classes.selectionForm} direction="row" spacing={3}>
            <Grid item>
              <TextField 
              id = "male-input"
              name = "numberOfMales"
              label = "Number of Males"
              type = "number"
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={numberMale}
              onChange={handleFemales}
              />
            </Grid>

            <Grid item>
              <TextField 
              id = "male-input"
              name = "numberOfFemales"
              label = "Number of Females"
              type = "number"
              InputProps={{
                inputProps: { min: 0 }
              }}
              value={numberFemale}
              onChange={handelMales}
              />
            </Grid>
          </Grid>
        </form>
        <Button className ={classes.selectButton}
        onClick={ handleSubmit}
         color = "primary"variant='contained'>Select</Button>

{/* table showing all applicants data  */}
         <PendingApplications/>

    </Box>


</div>

    )
}

export default Applicants