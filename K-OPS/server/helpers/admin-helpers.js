const { getCollection, } = require('.././config/connection')
const { KSEB_NOTIFICATIONS, } = require('.././config/db-config')





//for kseb

module.exports = {

    //ADMIN
    updateNotifications: (message, varifiedBy, date, time) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(KSEB_NOTIFICATIONS);
                collection.insertOne(
                    {
                        message: message,
                        date: date,
                        time: time,
                        varifiedBy: varifiedBy,

                    }).then(response => {
                        console.log(response);
                        resolve()
                    }).catch(err => {
                        console.log(err);
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
                const collection = await getCollection(HOSPITALS);
                collection.findOne({ regId: regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            resolve({ status: "ok" })
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

    //RATION-SHOP
    verifyPasswordRationShop: (regId, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(RATION_SHOPS);
                collection.findOne({ regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            resolve({ status: "ok" })
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


    //KSEB
    verifyPasswordKseb: (regId, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(KSEB);
                collection.findOne({ regId }).then(response => {
                    if (response != null) {
                        if (response.password === password) {
                            resolve({ status: "ok" })
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




}