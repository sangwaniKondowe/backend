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
import AllBenefiaries from './AllBenefiaries'


function ListestedBeneficiaries() {
  const classes = useStyles();
    const [data , setData] = useState([])
    const [regNum, setRegNum] = useState([])

    
    const handleSubmit = (event) => {
        event.preventDefault();
  

      
      const BeneUrl="http://localhost:5000/application/add?regNum="+regNum;
       
      axios.get(BeneUrl)
      
  
      .then(response => {
        
        
        console.log(response)
        
      })
     }
      
    const bene =(e)=>{
     e.preventDefault()
    setRegNum(e.target.value)
    }
  
    

  return (


    <div>
     <form onSubmit={handleSubmit}>

     <Grid container className={classes.selectionForm} direction="row" spacing={3}>
            <Grid item>
              <TextField 
              id = "reg-input"
              name = "regNum"
              label = "Enter Registration number"
              type = "text"
              value={regNum}
              onChange={bene}
               
              />
            </Grid>
            </Grid>
     </form>
     <Button className ={classes.selectButton}
        onClick={ handleSubmit}
         color = "primary"variant='contained'>add</Button>

        <AllBenefiaries/> 
    </div>
  )
}

export default ListestedBeneficiaries