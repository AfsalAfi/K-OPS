//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { getCollection } = require("../config/connection");
const { DOCTORS_DB, KSEB, KSEB_NOTIFICATIONS, HOSPITALS, RATION_NOTIFICATIONS } = require("../config/db-config");



// Function to check if a doctor is currently available
function isDoctorAvailableInDataBase(doctors) {
  return new Promise((resolve, reject) => {
    try {
      var ActiveDoctor = [];
      var availableTimeTo;

      for (var i = 0; i < doctors.length; i++) {
        console.log(doctors[i].availableTimeFrom);
        console.log(doctors[i].availableTimeTo);
        var currentTime = moment().format("hh:mm A");

        var time = moment(currentTime, 'hh:mm A').format('HH:mm');
        var currentTimeFloat = parseFloat(time.replace(':', '.'));

        var time = moment(doctors[i].availableTimeTo, 'hh:mm A').format('HH:mm');
        var availableTimeToFloat = parseFloat(time.replace(':', '.'));

        var time = moment(doctors[i].availableTimeFrom, 'hh:mm A').format('HH:mm');
        var availableTimeFromFloat = parseFloat(time.replace(':', '.'));

        console.log(availableTimeFromFloat, currentTimeFloat, availableTimeToFloat);

        if (doctors[i].availableTimeFrom.split(" ")[1] === "PM" && (currentTime.split(" ")[1] === "AM" || currentTime.split(" ")[1] === "PM") && doctors[i].availableTimeTo.split(" ")[1] === "AM") {
          console.log('keri');
          if (doctors[i].availableTimeFrom.split(" ")[1] === "PM" && currentTime.split(" ")[1] === "PM") {
            if (availableTimeFromFloat < currentTimeFloat && currentTimeFloat > availableTimeToFloat) {
              console.log('keriadas');
              ActiveDoctor.push(doctors[i]);
            }
          } else if (doctors[i].availableTimeFrom.split(" ")[1] === "PM" && currentTime.split(" ")[1] === "AM") {
            if (availableTimeFromFloat > currentTimeFloat && currentTimeFloat < availableTimeToFloat) {
              console.log('qqqqqqqqqq');
              ActiveDoctor.push(doctors[i]);
            }
          }
        }

        if (availableTimeFromFloat <= currentTimeFloat && currentTimeFloat <= availableTimeToFloat) {
          ActiveDoctor.push(doctors[i]);
        }




        // const currentDate = moment().format("YYYY-MM-DD");
        // // const currentTime = moment().format("HH:mm:ss.SSS");
        // var currentTime = moment().format("hh:mm A");
        // console.log(currentTime);
        // if (currentTime.split(" ")[1] === "PM" || currentTime.split(" ")[1] === "AM" && doctors[i].availableTimeTo.split(" ")[1] === "AM") {
        //   console.log("keri");
        //   availableTimeTo = moment(`${currentDate} ${doctors[i].availableTimeTo}`, "YYYY-MM-DD hh:mm A").add(1, 'day').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        // } else {
        //   console.log("kereela");
        //   availableTimeTo = moment(`${currentDate} ${doctors[i].availableTimeTo}`, "YYYY-MM-DD hh:mm A").toISOString();
        // }
        // availableTimeFrom = moment(`${currentDate} ${doctors[i].availableTimeFrom}`, "YYYY-MM-DD hh:mm A").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        // // const availableTimeFrom = moment(`${currentDate} ${doctors[i].availableTimeFrom}`, "YYYY-MM-DD hh:mm A").toISOString();
        // const current = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        // console.log(doctors[i].availableTimeFrom, current, doctors[i].availableTimeTo);
        // console.log(availableTimeFrom, current, availableTimeTo);
        // console.log(current >= availableTimeFrom && current <= availableTimeTo);
        // if (current >= availableTimeFrom && current <= availableTimeTo) {
        //   ActiveDoctor.push(doctors[i]);
        // }
      }

      resolve(ActiveDoctor);
    } catch (error) {
      console.log(error);
      reject()
    }
  })
}


module.exports = {

  //KSEB

  KSEB_enquries: (name, ContactNumber, type, description, divisionMail) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (divisionMail === null) {
          return reject({ message: "Division mail address not found" });
        }
        console.log(name, ContactNumber, type, description, divisionMail);
        // const transporter = nodemailer.createTransport({
        //   service: "hotmail",
        //   auth: {
        //     user: "ramettanQAZ@outlook.com",
        //     pass: "Qazxsw123",
        //   },
        // });

        // let res = await transporter.sendMail({
        //   from: "ramettanQAZ@outlook.com",
        //   to: `afsaldesktop@gmail.com,${divisionMail}`,
        //   subject: "Enquiry/Complaints",
        //   html: `<html>
        //           <body>
        //             <p><b>Type of Enquiry/Complaints :</b>${type}</p>
        //             <p><b>Description:</b>${description}</p>
        //             <br/>
        //             <p><b>Contact details:</b></p>
        //             <p><b>Name:</b>${name}</p>
        //             <p><b>Phone Number:</b>${ContactNumber}</p>
        //           </body>
        //         </html>`,
        // });
        // console.log(res);
        return resolve({ status: "ok" });
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    });
  },

  get_Divisions: (district) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(KSEB);
        collection.aggregate([
          {
            $match: { district: district }
          }, {
            $project: {
              _id: 0,
              password: 0
            }
          }, {
            $sort: { division: 1 }
          }
        ]).toArray().then(response => {
          if (response) {
            resolve({ status: "ok", result: response });
          } else {
            reject({ message: "not found" });
          }
        })
      } catch (error) {
        reject({ message: "Try after some time" });
      }
    })
  },

  KSEB_Report_Failures: (divisionMail, place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (divisionMail === null) {
          return reject({ message: "Division mail address not found" });
        }
        console.log(divisionMail, place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber);
        // const transporter = nodemailer.createTransport({
        //   service: "hotmail",
        //   auth: {
        //     user: "ramettanQAZ@outlook.com",
        //     pass: "Qazxsw123",
        //   },
        // });

        // let res = await transporter.sendMail({
        //   from: "ramettanQAZ@outlook.com",
        //   to: `afsaldesktop@gmail.com,${divisionMail}`,
        //   subject: "Report a failure",
        //   html: `<html>
        //           <body>
        //             <p><b>Complaint:</b>${Complaint}</p>
        //             <p><b>Time of happen:</b>${timeOfHappen}</p>
        //             <p><b>Place:</b>${place}</p>
        //             <p><b>landMark:</b>${landMark}</p>
        //             <p><b>Near by post number:</b>${nearByPostNumber}</p>
        //             <br/>
        //             <p><b>Contact details:</b></p>
        //             <p><b>Name:</b>${name}</p>
        //             <p><b>Phone Number:</b>${ContactNumber}</p>
        //           </body>
        //         </html>`,
        // });
        // console.log(res);
        return resolve({ status: "ok" });
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    })
  },

  showNotifications_KSEB: (regId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(KSEB_NOTIFICATIONS);
        collection.find({ regId: regId }).sort('_id', -1).limit(15).toArray().then(response => {
          if (response.length > 0) {
            resolve({ status: "ok", result: response })
          } else {
            reject({ message: "0 Notifications" })
          }
        }).catch(err => {
          reject({ message: "error while finding Notifications" })
        })
      } catch (err) {
        reject({ message: "error while finding Notifications" })

      }
    })
  },







  //HOSPITAL
  list_Medical_Facilities: (hospital) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(HOSPITALS);
        collection.find({ regId: hospital }).toArray().then(response => {
          resolve({ facilities: response[0].facilities[0], equipments: response[0].equipments[0] })
        })
      }
      catch (err) {
        reject({ message: "error while listing services" });
      }
    })
  },



  get_Hospitals: (district) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(HOSPITALS);
        collection.aggregate([
          {
            $match: { district: district }
          }, {
            $project: {
              _id: 0,
              password: 0
            }
          }, {
            $sort: { name: 1 }
          }
        ]).toArray().then(response => {
          if (response) {
            resolve({ status: "ok", result: response });
          } else {
            reject({ message: "not found" });
          }
        })
      } catch (error) {
        reject({ message: "Try after some time" });
      }
    })
  },

  HOSPITAL_enquries: (name, ContactNumber, type, description, divisionMail) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (divisionMail === null) {
          return reject({ message: "Hospital mail address not found" });
        }
        console.log(name, ContactNumber, type, description, divisionMail);
        // const transporter = nodemailer.createTransport({
        //   service: "hotmail",
        //   auth: {
        //     user: "ramettanQAZ@outlook.com",
        //     pass: "Qazxsw123",
        //   },
        // });

        // let res = await transporter.sendMail({
        //   from: "ramettanQAZ@outlook.com",
        //   to: `afsaldesktop@gmail.com,${divisionMail}`,
        //   subject: "Enquiry/Complaints",
        //   html: `<html>
        //           <body>
        //             <p><b>Type of Enquiry/Complaints :</b>${type}</p>
        //             <p><b>Description:</b>${description}</p>
        //             <br/>
        //             <p><b>Contact details:</b></p>
        //             <p><b>Name:</b>${name}</p>
        //             <p><b>Phone Number:</b>${ContactNumber}</p>
        //           </body>
        //         </html>`,
        // });
        // console.log(res);
        return resolve({ status: "ok" });
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    });
  },


  isDoctorAvailable: (doctors) => {
    return new Promise((resolve, reject) => {
      try {
        var ActiveDoctor = [];
        for (i = 0; i < doctors.length; i++) {
          const currentDate = moment().format("YYYY-MM-DD");
          const currentTime = moment().format("HH:mm:ss.SSS");
          const availableTimeFrom = `${currentDate}T${doctors[i].availableTimeFrom}`;
          const availableTimeTo = `${currentDate}T${doctors[i].availableTimeTo}`;
          const formattedDatefrom = moment(availableTimeFrom, "YYYY-MM-DDTh:mm A").toISOString();
          const formattedDateTo = moment(availableTimeTo, "YYYY-MM-DDTh:mm A").toISOString();
          const current = moment(`${currentDate}T${currentTime}`).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
          if (current >= formattedDatefrom && current <= formattedDateTo) {
            ActiveDoctor.push(doctors[i])
          }
        }
        resolve(ActiveDoctor);
      } catch (error) {
        reject()
      }
    })
  },



  //RATION SHOP


  showRationNotifications: (regId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(RATION_NOTIFICATIONS);
        collection.find({ regId: regId }).sort('_id', -1).limit(15).toArray().then(response => {
          resolve(response)
        })
          .catch(err => {
            reject({ message: "error while fetching notifications" })
          })
      } catch {
        reject({ message: "error while fetching notifications" })
      }

    })
  },

  list_Available_Doctors: (hospital) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(DOCTORS_DB);
        collection.find({ hospital: hospital }).toArray().then(async (response) => {
          await isDoctorAvailableInDataBase(response).then(ActiveDoctors => {
            console.log("response");
            console.log(response);
            if (ActiveDoctors.length > 0) {
              resolve({ status: "ok", availableDoctors: ActiveDoctors });
            } else {
              reject("No doctor is currently available.");
            }
          })
        }).catch(err => {
          reject({ message: "error while finding Doctors" })
        })
      } catch (err) {
        reject({ message: "error while finding Doctors" })

      }
    })

  },



}