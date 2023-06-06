const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { getCollection } = require("../config/connection");
const { DOCTORS_DB, KSEB } = require("../config/db-config");


// Function to check if a doctor is currently available
function isDoctorAvailable(doctors) {
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
              password: 0,
              regId: 0
            }
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

  showNotifications_KSEB: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(KSEB_NOTIFICATIONS);
        collection.find().toArray().then(response => {

          resolve(response)
        }).catch(err => {
          reject({ message: "error while finding Notifications" })
        })
      } catch (err) {
        reject({ message: "error while finding Notifications" })

      }
    })
  },





  //HOSPITAL

  HOSPITAL_enquries: (name, ContactNumber, type, description, divisionMail) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (divisionMail === null) {
          return reject({ message: "Hospital mail address not found" });
        }
        console.log(name, ContactNumber, type, description, divisionMail);
        const transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "ramettanQAZ@outlook.com",
            pass: "Qazxsw123",
          },
        });

        let res = await transporter.sendMail({
          from: "ramettanQAZ@outlook.com",
          to: `afsaldesktop@gmail.com,${divisionMail}`,
          subject: "Enquiry/Complaints",
          html: `<html>
                  <body>
                    <p><b>Type of Enquiry/Complaints :</b>${type}</p>
                    <p><b>Description:</b>${description}</p>
                    <br/>
                    <p><b>Contact details:</b></p>
                    <p><b>Name:</b>${name}</p>
                    <p><b>Phone Number:</b>${ContactNumber}</p>
                  </body>
                </html>`,
        });
        console.log(res);
        return resolve({ status: "ok" });
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    });
  },

  list_Available_Doctors: (hospital) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(DOCTORS_DB);
        collection.find({ hospital: hospital }).toArray().then(async (response) => {
          await isDoctorAvailable(response).then(ActiveDoctors => {
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

  }



}
