const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { getCollection } = require("../config/connection");



module.exports = {

  //KSEB

  KSEB_enquries: (name, ContactNumber, type, description, divisionMail) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (divisionMail === null) {
          return reject({ message: "Division mail address not found" });
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

  KSEB_Report_Failures: (divisionMail, place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (divisionMail === null) {
          return reject({ message: "Division mail address not found" });
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
          subject: "Report a failure",
          html: `<html>
                  <body>
                    <p><b>Complaint:</b>${Complaint}</p>
                    <p><b>Time of happen:</b>${timeOfHappen}</p>
                    <p><b>Place:</b>${place}</p>
                    <p><b>landMark:</b>${landMark}</p>
                    <p><b>Near by post number:</b>${nearByPostNumber}</p>
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

      } catch (error) {

      }
    })

  }



}
