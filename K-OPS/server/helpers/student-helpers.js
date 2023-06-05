const Promise = require("promise");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const {getCollection,} = require('.././config/connection')
const {KSEB_NOTIFICATIONS,} =require('.././config/db-config')




module.exports = {

  showNotifications :()=>{
    return new Promise(async(resolve,reject) =>{
        try{
            const collection = await getCollection(KSEB_NOTIFICATIONS);
            collection.find().toArray().then(response=>{
              
                resolve(response)
            }).catch(err=>{
                reject({message:"error while finding Notifications"})
            })
        }catch(err){
            reject({message:"error while finding Notifications"})

        }
    })
},

  // isUserExist: (regNo) => {
  //   return new Promise(async (resolve, reject) => {
  //     const collection = await getCollection(STUDENT_DETAILS);
  //     await collection.findOne({ regNo }).then((res) => {
  //       if (!res) {
  //         resolve(null);
  //       }
  //       resolve(res);
  //     });
  //   });
  // },



}
