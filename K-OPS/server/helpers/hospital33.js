var { getCollection } = require("../config/connection");
const { HOSPITALS, KSEB, RATION_SHOPS } = require("../config/db-config");


module.exports = {

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