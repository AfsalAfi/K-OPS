const { getCollection, } = require('.././config/connection')
const { KSEB_NOTIFICATIONS,
    RATION_NOTIFICATIONS,
    OPERATORS_COLLECTION,
    KSEB_FAILURES_ENQUIRIES,
    ADMIN,
    RATION_SHOP_FAILURES_ENQUIRIES,
    RATION_SHOP_STOCKS,
    HOSPITAL_ENQUIRIES,
    DOCTORS_DB } = require('.././config/db-config')
const nodemailer = require("nodemailer");
const { JWT_STRING_FOR_ADMIN } = require('../config/constants');
const jwt = require("jsonwebtoken");









module.exports = {

    //ADMIN
    self_auth: (regId,password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(ADMIN);
                
                collection.findOne({adminId:regId}).then(response => {
                    if (response) {console.log("response");
                        if (response.password === password) {
                            console.log("response");
                            let token = jwt.sign({ regId: regId }, JWT_STRING_FOR_ADMIN);
                            resolve({ status: "ok", token: token });
                        } else {
                            reject({ message: "wrong password" })
                        }
                    } else {
                        reject({ message: "Login failed" })
                    }
                })
            } catch (err) {
                reject({ message: "Login process failed" })
            }
        })
    },

    verifyPasswordOperator: (regId, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.findOne({ regId: regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            let token = jwt.sign({ regId: regId }, JWT_STRING_FOR_ADMIN);
                            resolve({ status: "ok", operator: response.classify, token: token });
                        } else {
                            reject({ message: "Wrong password" })
                        }
                    } else {
                        reject({ message: "No Hospitals found" })
                    }
                })
            } catch (error) {
                reject({ message: "Login failed" })
            }
        })
    },

    create_ration_shop: (classify, password, regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.insertOne({
                    regId: regId,
                    password: password,
                    classify: classify,
                }).then(response => {
                    if (response.acknowledged === true) {
                        resolve({ status: "ok" });
                    } else {
                        reject({ message: "Ration shop creation failed" })
                    }
                })
            } catch (error) {
                reject({ message: "Ration shop reation failed" })

            }
        })
    },

    create_hospital: (classify, category, district, place, email, contact, name, password, regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.insertOne({
                    classify: classify,
                    category: category,
                    district: district,
                    place: place,
                    email: email,
                    contact: contact,
                    name: name,
                    password: password,
                    regId: regId,
                }).then(response => {
                    if (response.acknowledged === true) {
                        resolve({ status: "ok" });
                    } else {
                        reject({ message: "Hospital creation failed" })
                    }
                })
            } catch (error) {
                reject({ message: "Hospital creation failed" })

            }
        })
    },

    create_kseb_division: (regId, password, district, division, place, contact, email, officer, classify) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.insertOne({
                    regId: regId,
                    password: password,
                    district: district,
                    division: division,
                    place: place,
                    contact: contact,
                    email: email,
                    officer: officer,
                    classify: classify,
                }).then(response => {
                    if (response.acknowledged === true) {
                        resolve({ status: "ok" });
                    } else {
                        reject({ message: "KSEB new Division creation failed" })
                    }
                })
            } catch (error) {
                reject({ message: "KSEB new Division creation failed" })

            }
        })
    },



    //HOSPITAL

    list_Enquiry_Hospital: (regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(HOSPITAL_ENQUIRIES);
                collection.aggregate([
                    {
                        $match: { regId: regId, enquiry: true }
                    }, {
                        $project: {
                            name: 1,
                            ContactNumber: 1,
                            type: 1,
                            description: 1,
                            emailAddress: 1,
                        }
                    }
                ]).toarray().then(response => {
                    if (response.length > 0) {
                        resolve({ status: "ok", enquiryList: response })
                    } else {
                        reject({ message: "Nothing found" })
                    }
                })
            } catch (err) {
                reject({ message: "error in listing" })
            }
        })
    },

    create_Doctor: (name, specialization, availableTimeFrom, availableTimeTo, hospital, doctor_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(DOCTORS_DB);
                collection.insertOne({
                    name: name,
                    specialization: specialization,
                    availableTimeFrom: availableTimeFrom,
                    availableTimeTo: availableTimeTo,
                    hospital: hospital,
                    doctor_id: doctor_id,
                }).then(response => {
                    if (response) {
                        resolve({ status: "ok" })
                    } else {
                        reject({ message: "Creation failed" })
                    }
                })
            } catch (err) {
                reject({ message: "Creation failed" })
            }
        })
    },





    //RATION-SHOP

    RationShopNotification: (message, date, time, regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(RATION_NOTIFICATIONS);
                collection.insertOne({
                    regId: regId,
                    message: message,
                    date: date,
                    time: time,
                }).then(response => {
                    if (response.acknowledged === true) {
                        resolve()
                    } else {
                        reject({ message: "Notification not send" })
                    }
                }).catch(err => {
                    reject({ message: "Notification sending failed" })
                })

            } catch (err) {
                reject({ message: "Notification sending failed" })

            }
        })


    },

    list_Enquiry_RationShop: (regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(RATION_SHOP_FAILURES_ENQUIRIES);
                collection.aggregate([
                    {
                        $match: { regId: regId, enquiry: true }
                    }, {
                        $project: {
                            name: 1,
                            ContactNumber: 1,
                            type: 1,
                            description: 1,
                            emailAddress: 1,
                        }
                    }
                ]).toarray().then(response => {
                    if (response.length > 0) {
                        resolve({ status: "ok", enquiryList: response })
                    } else {
                        reject({ message: "Nothing found" })
                    }
                })
            } catch (err) {
                reject({ message: "error listing update notification" })
            }
        })
    },

    list_available_stocks: (regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(RATION_SHOP_STOCKS);
                collection.aggregate([
                    {
                        $match: { regId: regId }
                    }
                ]).toArray().then(response => {
                    if (response.length > 0) {
                        resolve({ status: "ok", stocks: response })
                    } else {
                        reject({ message: "Fetching stocks failed" })
                    }
                })
            } catch (err) {
                reject({ message: "Fetching stocks failed" })
            }
        })
    },

    update_available_stocks: (regId, white, blue, red, yellow) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(RATION_SHOP_STOCKS);
                collection.updateOne(
                    {
                        $match: { regId: regId }
                    },
                    {
                        $set: {
                            white: { Aatta: white.Aatta, pachari: white.pachari, chakkari: white.chakkari, kerosene: white.kerosene, },
                            blue: { Aatta: blue.Aatta, pachari: blue.pachari, chakkari: blue.chakkari, kerosene: blue.kerosene, },
                            red: { Aatta: red.Aatta, pachari: red.pachari, chakkari: red.chakkari, kerosene: red.kerosene, },
                            yellow: { Aatta: yellow.Aatta, pachari: yellow.pachari, chakkari: yellow.chakkari, kerosene: yellow.kerosene, },
                        }
                    }
                ).then(response => {
                    if (response.modifiedCount === 1) {
                        resolve({ status: "ok" })
                    } else {
                        reject({ message: "Try again after some time..." })
                    }
                })
            } catch (err) {
                reject({ message: "Try again after some time..." })
            }
        })
    },








    //KSEB



    pushNotifications: (regId, message, date, time) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(KSEB_NOTIFICATIONS);
                collection.insertOne(
                    {
                        regId: regId,
                        message: message,
                        date: date,
                        time: time,
                    }).then(response => {
                        if (response.acknowledged === true) {
                            resolve()
                        }
                    }).catch(err => {
                        reject({ message: "error while update notification" })
                    })
            } catch (err) {
                reject({ message: "error while update notification" })
            }
        })

    },




    //HOSPITAL
    verifyPasswordHospital: (regId, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.findOne({ regId: regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            resolve({ status: "ok", operator: response.classify })
                        } else {
                            reject({ message: "Wrong password" })
                        }
                    } else {
                        reject({ message: "No Hospitals found" })
                    }
                })
            } catch (error) {
                reject({ message: "Login failed" })
            }
        })
    },


    decrement_OPSTATUS : (doctor_id)=>{
        console.log(doctor_id);
        return new Promise(async(resolve,reject)=>{
            try{
                const collection  = await getCollection(DOCTORS_DB);
                collection.updateOne(
                    {doctor_id : doctor_id},
                    {
                        $inc : {opTickets : -1 },
                    }
                    ).then(response=>{
                        return collection.findOne({doctor_id :doctor_id});
                    }).then(updatedDoc => {
                        resolve(updatedDoc.opTickets);
                      }).catch(err=>{
                        reject({message:"error while decrementing op ticket"})
                    })

            }catch(err){
                reject({message:"error while decrementing op ticket"})
            }
        })

    },

    increment_OPSTATUS : (doctor_id)=>{
        console.log(doctor_id);
        return new Promise(async(resolve,reject)=>{
            try{
                const increment_value = 1;
                const collection  = await getCollection(DOCTORS_DB);
      
                // collection.find({doctor_id : doctor_id}).toArray()
                collection.updateOne(
                    {doctor_id : doctor_id},
                    {
                        $inc : {opTickets : 1 },
                    }
                    ).then(response=>{
                        return collection.findOne({doctor_id :doctor_id});
                    }).then(updatedDoc => {
                        resolve(updatedDoc.opTickets);
                      }).catch(err=>{
                        reject({message:"error while incrementing op ticket"})
                    })

            }catch(err){
                reject({message:"error while incrementing op ticket"})
            }
        })

    },

    //RATION-SHOP
    verifyPasswordRationShop: (regId, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.findOne({ regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            resolve({ status: "ok", operator: response.classify })
                        } else {
                            reject({ message: "Wrong password" })
                        }
                    } else {
                        reject({ message: "No Rationshop found" })
                    }
                })
            } catch (error) {
                reject({ message: "Login failed" })
            }
        })
    },


  


    //KSEB
    verifyPasswordKseb: (regId, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(OPERATORS_COLLECTION);
                collection.findOne({ regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            resolve({ status: "ok", operator: response.classify })
                        } else {
                            reject({ message: "Wrong password" })
                        }
                    } else {
                        reject({ message: "No kseb found" })
                    }
                })
            } catch (error) {
                reject({ message: "Login failed" })
            }
        })
    },

  

    list_Notifications: (regId) => {

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
                    { $limit: 15 }
                ]).toArray().then(response => {
                    if (response.length > 0) {
                        resolve({ status: "ok", notifications: response });
                    } else {
                        reject({ message: "Nothing found" })
                    }
                }).catch(err => {
                    reject({ message: "error while listing notification" })
                })
            } catch (err) {
                reject({ message: "error listing update notification" })
            }
        })
    },

    list_failures: (regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(KSEB_FAILURES_ENQUIRIES);
                collection.aggregate([
                    {
                        $match: { regId: regId, enquiry: false }
                    }, {
                        $project: {
                            place: 1,
                            landMark: 1,
                            nearByPostNumber: 1,
                            Complaint: 1,
                            timeOfHappen: 1,
                            name: 1,
                            ContactNumber: 1,
                            emailAddress: 1
                        }
                    }
                ]).toarray().then(response => {
                    if (response.length > 0) {
                        resolve({ status: "ok", failureList: response })
                    } else {
                        reject({ message: "Nothing found" })
                    }
                })
            } catch (err) {
                reject({ message: "error listing update notification" })
            }
        })
    },

    list_Enquiry_KSEB: (regId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(KSEB_FAILURES_ENQUIRIES);
                collection.aggregate([
                    {
                        $match: { regId: regId, enquiry: true }
                    }, {
                        $project: {
                            name: 1,
                            ContactNumber: 1,
                            type: 1,
                            description: 1,
                            emailAddress: 1,
                        }
                    }
                ]).toarray().then(response => {
                    if (response.length > 0) {
                        resolve({ status: "ok", enquiryList: response })
                    } else {
                        reject({ message: "Nothing found" })
                    }
                })
            } catch (err) {
                reject({ message: "error listing update notification" })
            }
        })
    },

    reply_for_enquiry_and_report: (email, message, subject) => {
        return new Promise(async (resolve, reject) => {
            try {
                const transporter = nodemailer.createTransport({
                    service: "hotmail",
                    auth: {
                        user: "ramettanQAZ@outlook.com",
                        pass: "Qazxsw123",
                    },
                });

                let res = await transporter.sendMail({
                    from: "ramettanQAZ@outlook.com",
                    to: `afsaldesktop@gmail.com,${email}`,
                    subject: `${subject}`,
                    html: `<html>
                          <body>
                            <p><b>${message}</p>
                          </body>
                        </html>`,
                });
                console.log(res);
                if (res) {
                    resolve({ status: "ok" })
                } else {
                    reject({ message: "process failed" })
                }
            } catch (err) {
                reject({ message: "process failed" })
            }
        })
    },

}