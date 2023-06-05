const Promise = require('promise');
const {getCollection,} = require('.././config/connection')
const {KSEB_NOTIFICATIONS,} =require('.././config/db-config')





//for kseb

module.exports = {

    updateNotifications: (message,varifiedBy,date,time)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const collection = await getCollection(KSEB_NOTIFICATIONS);
                collection.insertOne(
                    {
                        message :message,
                        date : date,
                        time : time,
                        varifiedBy : varifiedBy,

                }).then(response=>{
                    console.log(response);
                    resolve()
                }).catch(err=>{
                    console.log(err);
                    reject({message:"error while update notification"})
                })

            }catch(err){

                reject({message:"error while update notification"})
            }
        })

    },



    
}