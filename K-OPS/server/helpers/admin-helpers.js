const { getCollection, } = require('.././config/connection')
const { KSEB_NOTIFICATIONS,
    RATION_NOTIFICATIONS,
    OPERATORS_COLLECTION } = require('.././config/db-config')







module.exports = {

    //ADMIN

    updateNotifications: (regId, message, varifiedBy, date, time) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(KSEB_NOTIFICATIONS);
                collection.insertOne(
                    {
                        regId: regId,
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
                        reject({ message: "No Hospitals found" })
                    }
                })
            } catch (error) {
                reject({ message: "Login failed" })
            }
        })
    },


    RationShopNotification: (message, varifiedBy, date, time, shopNumber) => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection = await getCollection(RATION_NOTIFICATIONS);
                collection.insertOne({
                    shopNumber: shopNumber,
                    message: message,
                    date: date,
                    time: time,
                    varifiedBy: varifiedBy,
                }).then(response => {
                    resolve()
                }).catch(err => {
                    reject({ message: "error while updating notification" })
                })

            } catch (err) {
                reject({ message: "error while updating notification" })

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
                        reject({ message: "No Hospitals found" })
                    }
                })
            } catch (error) {
                reject({ message: "Login failed" })
            }
        })
    },

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


}