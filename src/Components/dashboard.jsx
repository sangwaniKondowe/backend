import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, CardContent, Card } from '@material-ui/core'
import { useStyles } from './BodyStyles'
import { PageHeader } from './Common/CommonComponents'

import CommonGraphComponents from './Common/CommonGraphComponents';
import { useNavigate } from 'react-router-dom';
import { Bar} from 'react-chartjs-2';
import DataAnalytics from './DataAnalytics'
import axios from 'axios';

import History from './ShortlistedHistory';
import BeneficiaryHistory from './BeneficiaryHistory';

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

const countingAppications= async () => {
  await axios.get(baseDataUrl)
  .then(res => {
    console.log(res)
    setData(res.data)

    

  })
  .catch(err =>{
    console.log(err)
  })
}


useEffect(() => {
  countingAppications()
},[])



  return (
    <div>
    

        <PageHeader label="Dashboard" pageTitle="Scholarship Overview" />
        

    
        <Grid container spacing={2}>

          <Grid item xs={6} sm={4}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                  Total applications

                  </Typography>

                 
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>

                  <h1 style={{color:'green'}}>{data.totalApplications}</h1>

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

                  <h1 style={{color:'red'}}>{data.totalFemales}</h1>
               
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

                  <h1 style={{color:'red'}}>{data.totalMales}</h1>

                  

                  </Typography>
                </CardContent>


              </Card>

            </Grid>



            <Grid item xs={6} sm={6}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                  

                  </Typography>

                
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>

                
                <History/>
                  

                  </Typography>
                </CardContent>


              </Card>

            </Grid>


            <Grid item xs={6} sm={6}>
              <Card style={{ height: '100%' }} >

                <CardContent className={classes.cardCentent}>
                  <Typography variant="body2" className={classes.cardLabel}>

                  

                  </Typography>

                
                  <Typography variant="h6" component="h6" className={classes.applicantsNumber}>

                
                <BeneficiaryHistory/>
                  

                  </Typography>
                </CardContent>


              </Card>

            </Grid>



            </Grid>
        
          

            



    </div>
  );

  }
export default Dashboard
