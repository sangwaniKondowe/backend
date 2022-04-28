"use strict";
const { raw } = require("express");
const Application = require("../models/application");
const Shortlisted = require("../models/shortlist");
const { Op } = require("sequelize");
const crypto = require('crypto').webcrypto
const moment = require('moment')
const nodemailer = require('nodemailer');
const Beneficiary = require('../models/beneficiary')

// Applying for the scholarship

exports.sending_application = async (req, res) => {
  const {
    firstname,
    lastname,
    regNum,
    gender,
    email,
    social,
    gpa,
    yrofstudy,
    ref,
  } = req.body;

  try {
    const addApp = await Application.create({
      firstname,
      lastname,
      regNum,
      gender,
      email,
      social,
      gpa,
      yrofstudy,
      ref,
    });

    if (addApp) {
      res.status(200).json({
        message: "Success",
      });
    } else {
      res.send({
        success: false,
      });
    }
  } catch (err) {
    res.sendStatus(409);
  }
};

// Getting all the required information for visualization

exports.countAll = async (req, res) => {
  try {
    const all = await Application.findAll();
    if (all) {
      const females = all.filter((app) => app.gender === "female");
      const males = all.filter((app) => app.gender === "male");
      const yr2 = all.filter((app) => app.yrofstudy === 2);
      const yr3 = all.filter((app) => app.yrofstudy === 3);

      const dataToReturn = {
        totalApplications: all.length,
        totalFemales: females.length,
        totalMales: males.length,
        secondyr: yr2.length,
        thirdyr: yr3.length,
      };

      res.send(dataToReturn);
    } else {
      res.status(404).send("Nothing to display");
    }
  } catch (err) {
    console.log(err);
  }
};

// Get all applications with all required details

exports.allWithDetails = async (req, res) => {
  try {
    const user = await Application.findAll();
    if (user) {
      console.log(user);
      const users = [];

      user.forEach((element) => {
        users.push({
          uuid: element.uuid,
          firstname: element.firstname,
          lastname: element.lastname,
          email: element.email,
          regnum: element.regNum,
          yrofstudy: element.yrofstudy,
          gender: element.gender,
          gpa: element.gpa,
        });
      });
      res.send(users);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
};

// Shortlisting candidates depending on a
// selection criteria( ie. CS student(regnum), gpa, gender, yrofstudy)

const generateRandom = (min, max, maxRange) => {
  var byteArray = new Uint8Array(1)
  crypto.getRandomValues(byteArray)
  var range = max - min + 1
  if (byteArray[0] >= Math.floor(maxRange / range) * range) {
    return generateRandom(min, max, maxRange)
  }

  return min + (byteArray[0] % range);

}






exports.markComplete = async (req, res) => {
  const { males, females } = req.query;

  const femaleArr = await Application.findAll({
    where: {
      gender: "female",
    },
    order: [["gpa", "DESC"]],
  });

  const malesArr = await Application.findAll({
    where: {
      gender: "male",
    },
    order: [["gpa", "DESC"]],
  });

  //holders for filtering
  let mToReturn = [];
  let fToReturn = [];
  let fHolder = [];
  let mHolder = [];

  const maleSetToReturn = new Set();
  const femaleSettoReturn = new Set();
  if (males >= malesArr.length) {
    mToReturn = malesArr;
  } else {
    const deservingMale = malesArr.filter((m) => {
      return (
        m.regNum.includes("bsc") ||
        (m.regNum.includes("bed-com") && !(m.yrofstudy > 3))
      );
    });

    if (males >= deservingMale.length) {
      mToReturn = deservingMale;
    } else {
      for (let i = 0; i < males; i++) {
        mToReturn.push(deservingMale[i]);
      }
    }

    // while (mToReturn.length != males) {
    //   let first = malesArr[generateRandom(0, malesArr.length - 1, 256)];
    //   mHolder.push(first);
    //   mToReturn = mHolder.filter(
    //     (value, index, self) =>
    //       self.findIndex((v) => v.id === value.id) === index
    //   );
    // }
  }
  if (females >= femaleArr.length) {
    fToReturn = femaleArr;
  } else {
    const deservingFemale = femaleArr.filter((f) => {
      return (
        f.regNum.includes("bsc") ||
        (f.regNum.includes("bed-com") && !(f.yrofstudy > 3))
      );
    });

    if (females >= deservingFemale.length) {
      fToReturn = deservingFemale;
    } else {
      for (let i = 0; i < females; i++) {
        fToReturn.push(deservingFemale[i]);
      }
    }
  }

  let unique = mToReturn.concat(fToReturn);

  res.send({ ele: unique });

  unique.map(async app => {
      const pp = await Shortlisted.create({
        applicationId: app.id
      })
      if(pp) {
        Shortlisted.update({ status: "COMPLETED" }, {
                where: { applicationId: app.id }
              })
      
    }
   
  })

  const emails = []
  unique.forEach(mail => {
  emails.push({
    "email": mail.email,
    })
  })
  //res.send({email: emails})

  let allemails = emails.reduce((arr, email) => {
    arr.push(email.email)
    return (arr)
  }, [])

  sendEmail(allemails)
};












function sendEmail(allemails) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'buy73v3n7psfqxrh@ethereal.email', // generated ethereal user
      pass: 'Wanhtrw7MRjv9p3xuS'  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Glen Fally Contact" <gfemail@gmail.com>', // sender address
    to: allemails, // list of receivers
    subject: 'Glen Fally Scholarship Approval', // Subject line
    html: "<b>You have been shortlisted for the Glen Fally Scholarship interviews. For more details contact: 123456778</b>" // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email(s) sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });

}

// Retrieve previous records accorting to time 

exports.prevBen = async (req, res) => {

  const { year } = req.query
//const year = 2022

  try {
    const history = await Shortlisted.findAll({
     // attributes: ["createdAt"],
      where: {
        createdAt: {
          [Op.between]: [`${year}-01-01 00:00:00.857+02`, `${year}-12-31 23:59:00.857+02` ],
        },
      },
      include: {
          model: Application,
          attributes: [
            "firstname",
            "lastname",
            "email",
            "gpa",
            "gender",
            "yrofstudy",
            "regNum",

          ]
      },
      logging: console.log,
      order: [["createdAt", "ASC"]],
      //limit: count
    });
    if (history) {
      const sht = []
    history.forEach(element => {
      sht.push({
        "id":element.id,
        "uuid": element.uuid,
        "firstname": element.application.firstname,
        "lastname": element.application.lastname,
        "email": element.application.email,
        "regNum": element.application.regNum,
        "yrofstudy": element.application.yrofstudy,
        "gender": element.application.gender,
        "gpa": element.application.gpa,
        
      });});
      const dataToReturn = {
        totalShortlisted: sht.length,
        
      };

      const every = sht.concat(dataToReturn)
      //res.send(sht);
      res.send(every)
    }
  } catch (err) {
    console.log(err);
  }
};

// Get all the shortlisted candidates from the table 

exports.statusComplete = async (req, res) => {
  const all = await Shortlisted.findAll({
    where: {
      status: "COMPLETED",
    },
    include: {
      model: Application,
      attributes: [
        "firstname",
        "lastname",
        "email",
        "regNum",
        "gender",
        "yrofstudy",
        "gpa"
      ]}
    })
  if (all) {

console.log(all)

    const app = []

    all.forEach(element => {
      app.push({
        "id":element.id,
        "uuid": element.uuid,
        "status": element.status,
        "firstname": element.application.firstname,
        "lastname": element.application.lastname,
        "email": element.application.email,
        "regNum": element.application.regNum,
        "yrofstudy": element.application.yrofstudy,
        "gender": element.application.gender,
        "gpa": element.application.gpa,
      }
      );

    });

    
    res.send({ applications: app })
  } else {
    res.status(404).send("no approved applications");
  }
}


exports.prevShortlisted = async (req, res) => {

  const TODAY_START = moment()
  const NOW = moment.duration(1, "year")
  
  
    try {
      const history = await Shortlisted.findAll({
       // attributes: ["createdAt"],
        where: {
          createdAt: {
            [Op.between]: [ TODAY_START , NOW],
          },
        },
        logging: console.log,
        raw: true,
        order: [["createdAt", "ASC"]],
        //limit: count
      });
      if (history) {
        res.send(history);
      }
    } catch (err) {
      console.log(err);
    }
  };

 exports.addBeneficiary = async (req, res) => {

       const regNumber = req.params.regNum

       try {
         const search = await Application.findOne({
           where: {
              regNumber 
           },
         })

         console.log(search)
         if (search === null) {
          res.status(401).json({ message: "no such regstration number exists" });
        }
         else {
          console.log(search)
          await Beneficiary.create({
            shortlistId: search.id 
          })
         }

       }
       catch(err) {
         console.log(err)
       }
 }


 exports.countAllShortlisted = async (req, res) => {
  try {
    const all = await Shortlisted.findAll({
      where: {
        status: "COMPLETED",
      },
      include: {
        model: Application,
        attributes: [
          "firstname",
          "lastname",
          "email",
          "regNum",
          "gender",
          "yrofstudy",
          "gpa"
        ]}
    });
    if (all) {

      const detail = []

      all.forEach(element => {
        detail.push({
          "id":element.id,
          "uuid": element.uuid,
          "status": element.status,
          "firstname": element.application.firstname,
          "lastname": element.application.lastname,
          "email": element.application.email,
          "regNum": element.application.regNum,
          "yrofstudy": element.application.yrofstudy,
          "gender": element.application.gender,
          "gpa": element.application.gpa,
        }
        );
  
      });

  
      const females = detail.filter((app) => app.gender === "female");
      const males = detail.filter((app) => app.gender === "male");
      const yr2 = detail.filter((app) => app.yrofstudy === 2);
      const yr3 = detail.filter((app) => app.yrofstudy === 3);
     
      const dataToReturn = {
        totalShortlisted: detail.length,
        totalFemales: females.length,
        totalMales: males.length,
        secondyr: yr2.length,
        thirdyr: yr3.length,
      };

      res.send(dataToReturn);
    } else {
      res.status(404).send("Nothing to display");
    }
  } catch (err) {
    console.log(err);
  }
};