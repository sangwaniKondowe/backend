"use strict";
const { raw } = require("express");
const Application = require("../models/application");
const Shortlisted = require("../models/shortlist");
const { Op } = require("sequelize");
const crypto = require('crypto').webcrypto

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
    order: [["gpa", "ASC"]],
  });

  const malesArr = await Application.findAll({
    where: {
      gender: "males",
    },
    order: [["gpa", "ASC"]],
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

    // while (fToReturn.length != females) {
    //   let first = femaleArr[generateRandom(0, femaleArr.length - 1, 256)];
    //   fHolder.push(first);
    //   fToReturn = fHolder.filter(
    //     (value, index, self) =>
    //       self.findIndex((v) => v.id === value.id) === index
    //   );
    // }
  }

  let unique = mToReturn.concat(fToReturn);

  res.send({ ele: unique });
};

//   unique.map(async app => {
//     await Application.update({ status: "COMPLETED" }, {
//       where: { id: app.id }
//     })
//  })

//   let toRData = unique.map(ui => {
//     return { ...ui, status: "COMPLETED" }
//   })
//   if (toRData) {

//     let user = [];
//     toRData.forEach(element => {
//       user.push({
//         "id": element.id,
//         "uuid": element.uuid,
//         "firstname": element.firstname,
//         "lastname": element.lastname,
//         "email": element.email,
//         "regnum": element.regnum,
//         "yrofstudy": element.user.yrofstudy,
//         "gender": element.user.gender,
//         "gpa": element.user.gpa,
//       }
//       );

//     });
//     res.send({ complete: user })

// const emails = []
// user.forEach(mail => {
//   emails.push({
//     "email": mail.email,
//   })
// })
//console.log(emails)

//let stringMessage = Object.values(emails);

//     let allemails = emails.reduce((arr, email) => {
//       arr.push(email.email)
//       return (arr)
//     }, [])

//     //console.log(allemails)

//     sendEmail(allemails)

exports.prevBen = async (req, res) => {
  try {
    const history = await Shortlisted.findAll({
      attributes: ["createdAt"],
      where: {
        createdAt: {
          [Op.between]: ["2021-01-01 00:00:00", "2021-12-31 00:00:00"],
          [Op.between]: ["2022-01-01 00:00:00", "2020-12-31 00:00:00"],
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
