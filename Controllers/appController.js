'use strict'
const Application = require('../models/application')

exports.sending_application = async (req, res) => {
    
    const {firstname,lastname,regNum,gender,email,description,gpa,ref} = req.body

    try {
  
    

      const addApp = await Application.create({
        firstname,
        lastname,
        regNum,
        gender,
        email,
        description,
        gpa,
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
  
      res.status(409).json({message: "You can only apply once"})
    }
  }

