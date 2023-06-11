//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { getCollection } = require("../config/connection");
const { DOCTORS_DB, KSEB, KSEB_NOTIFICATIONS, HOSPITALS, RATION_NOTIFICATIONS, OPERATORS_COLLECTION, KSEB_REPORT_FAILURES, KSEB_FAILURES_ENQUIRIES, RATION_SHOP_FAILURES_ENQUIRIES, HOSPITAL_ENQUIRIES } = require("../config/db-config");

// Function to check if a doctor is currently available
function isDoctorAvailableInDataBase (doctors){
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

  KSEB_enquries: (regId, name, ContactNumber, type, description, emailAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (regId === null) {
          return reject({ message: "Division mail address not found" });
        }
        console.log(regId, name, ContactNumber, type, description, emailAddress);
        const collection = await getCollection(KSEB_FAILURES_ENQUIRIES);
        collection.insertOne({ regId, name, ContactNumber, type, description, emailAddress, enquiry: true })
          .then((response) => {
            if (response.acknowledged === true) {
              return resolve({ status: "ok" });
            } else {
              return reject({ message: "Process failed try again after some time..." });
            }
          })
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    });
  },

  get_Divisions: (district) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(OPERATORS_COLLECTION);
        collection.aggregate([
          {
            $match: { district: district, classify: "Kseb" }
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

  KSEB_Report_Failures: (regId, place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber, emailAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (regId === null) {
          return reject({ message: "Division not found" });
        }
        console.log(place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber);
        const collection = await getCollection(KSEB_FAILURES_ENQUIRIES);
        collection.insertOne({ regId, place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber, emailAddress, enquiry: false })
          .then((response) => {
            if (response.acknowledged === true) {
              return resolve({ status: "ok" });
            } else {
              return reject({ message: "Process failed try again after some time..." });
            }
          })
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    })
  },

  showNotifications_KSEB: (regId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(KSEB_NOTIFICATIONS);
        collection.aggregate([
          {
            $match: { regId: regId }
          },
          { $sort: { _id: -1 } },
          {
            $project: {
              _id: 0,
              regId: 0,
            }
          },
          { $limit: 13 }
        ]).toArray().then(response => {
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
        
        const collection = await getCollection(OPERATORS_COLLECTION);
        collection.find({regId: hospital ,classify: "Hospital" }).toArray().then(response => {
          
          resolve({ facilities: response[0].facilities[0], equipments: response[0].equipments[0] })
        })
      }
      catch (err) {
        reject({ message: "error while listing services" });
      }
    })
  },

  update_Medical_Facilities: (regId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(OPERATORS_COLLECTION);
        collection.findOneAndUpdate(
          {
            regId: regId,
            classify: "Hospital"
          }, {
          $set: { equipments: equipments, facilities: facilities }
        }, {
          returnOriginal: false
        }
        ).then(response => {
          if (response) {
            resolve({ status: "ok" })
          } else {
            reject({ message: "error while updating services" });
          }
        })
      }
      catch (err) {
        reject({ message: "error while updating services" });
      }
    })
  },

  get_Hospitals: (district) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(OPERATORS_COLLECTION);
        collection.aggregate([
          {
            $match: { district: district, classify: "Hospital" }
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

  HOSPITAL_enquries: (regId, name, ContactNumber, type, description, emailAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (regId === null) {
          return reject({ message: "Hospital not found" });
        }
        console.log(regId, name, ContactNumber, type, description, emailAddress);
        const collection = await getCollection(HOSPITAL_ENQUIRIES);
        collection.insertOne({ regId, name, ContactNumber, type, description, emailAddress, enquiry: true })
          .then((response) => {
            if (response.acknowledged === true) {
              return resolve({ status: "ok" });
            } else {
              return reject({ message: "Process failed try again after some time..." });
            }
          })

      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    });
  },


  // isDoctorAvailable: (doctors) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       var ActiveDoctor = [];
  //       for (i = 0; i < doctors.length; i++) {
  //         const currentDate = moment().format("YYYY-MM-DD");
  //         const currentTime = moment().format("HH:mm:ss.SSS");
  //         const availableTimeFrom = `${currentDate}T${doctors[i].availableTimeFrom}`;
  //         const availableTimeTo = `${currentDate}T${doctors[i].availableTimeTo}`;
  //         const formattedDatefrom = moment(availableTimeFrom, "YYYY-MM-DDTh:mm A").toISOString();
  //         const formattedDateTo = moment(availableTimeTo, "YYYY-MM-DDTh:mm A").toISOString();
  //         const current = moment(`${currentDate}T${currentTime}`).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  //         if (current >= formattedDatefrom && current <= formattedDateTo) {
  //           ActiveDoctor.push(doctors[i])
  //         }
  //       }
  //       resolve(ActiveDoctor);
  //     } catch (error) {
  //       reject()
  //     }
  //   })
  // },

  list_Available_Doctors: (hospital) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(DOCTORS_DB);
        collection.find({ hospital: hospital }).toArray().then(async (response) => {
          console.log(response);
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

  RationShop_enquries: (regId, name, ContactNumber, type, description, emailAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (regId === null) {
          return reject({ message: "ID not found" });
        }
        console.log(regId, name, ContactNumber, type, description, emailAddress);
        const collection = await getCollection(RATION_SHOP_FAILURES_ENQUIRIES);
        collection.insertOne({ regId, name, ContactNumber, type, description, emailAddress, enquiry: true })
          .then((response) => {
            if (response.acknowledged === true) {
              return resolve({ status: "ok" });
            } else {
              return reject({ message: "Process failed try again after some time..." });
            }
          })
      } catch (error) {
        return reject({ message: "Process failed try again after some time..." });
      }
    });
  },

  get_Ration_Shops: (district) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await getCollection(OPERATORS_COLLECTION);
        collection.aggregate([
          {
            $match: { district: district, classify: "RationShop" }
          }, {
            $project: {
              _id: 0,
              password: 0
            }
          }, {
            $sort: { RationShopName: 1 }
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





}