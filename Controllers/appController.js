'use strict'
const Application = require('../models/application')


// Applying for the scholarship

exports.sending_application = async (req, res) => {
    
    const {firstname,lastname,regNum,gender,email,description,gpa, yrofstudy,ref} = req.body

    try {
  
    

      const addApp = await Application.create({
        firstname,
        lastname,
        regNum,
        gender,
        email,
        description,
        gpa,
        yrofstudy,
        ref
      });
  
  
      if (addApp) {

        res.status(200).json({
            message: "Success"
        });
  
      }
      else {
        res.send({
          success: false
        })
      };
  
    } catch (err) {
  
      res.status(409)
    }
  }


// Getting all the required information for visualization


exports.countAll = async (req, res) => {
    try {

    const all = await Application.findAll()
    if (all) {
      const females = all.filter(app=>app.gender==='female')
      const males = all.filter(app=>app.gender==='male')
      const yr2 = all.filter(app=>app.yrofstudy=== 2)
      const yr3 = all.filter(app=>app.yrofstudy=== 3)
      
  
      const dataToReturn = {
        totalApplications : all.length,
        totalFemales: females.length,
        totalMales: males.length,
        secondyr: yr2.length,
        thirdyr: yr3.length,
  
      }
        
      res.send(dataToReturn)
    } else {
      res.status(404).send("Nothing to display");
    }
  } catch (err) {
  
        console.log(err)
    }
}


// Get all applications with all required details

exports.allWithDetails = async (req, res) => {

    try {

    const user = await Application.findAll()
    if (user) {
      console.log(user)
      const users = []
  
      user.forEach(element => {
        users.push({
          "uuid": element.uuid,
          "firstname": element.firstname,
          "lastname": element.lastname,
          "email": element.email,
          "regnum": element.regnum,
          "yrofstudy": element.yrofstudy,
          "gender": element.gender,
          "gpa": element.gpa,
        }
        );
  
      });
      res.send(users)
    } else {
      res.sendStatus(404);
    }
  }catch (err) {
  
    console.log(err)
}
}
  