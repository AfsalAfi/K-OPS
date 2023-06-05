const express = require('express');
const Kseb = express.Router();
const {updateNotifications,
    showNotifications,
} = require('../../../helpers/admin-helpers')

// Kseb.post("/", protect, async (req, res) => {
//     const regNo = req.user[0].regNo;
//     const hostel = req.user[0].hostel;
//     get_my_Hostel_Details(regNo, hostel).then(response => {
//         res.send(response);
//     }).catch(err => {
//         res.send(err);
//     })
// })

Kseb.post('/push-notifications',(req,res)=>{
    
    const message = req.body.message;
    console.log(message);
    varifiedBy = "KERALA STATE ELECTRICITY BOARD";
    let dt = new Date()
    const date = dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear();
    const time = dt.getHours()+"-"+dt.getMinutes()+"-"+dt.getSeconds();

    updateNotifications(message,varifiedBy,date,time).then(response=>{
        return res.status(200).send({status : "ok"});
    }).catch(err=>{
        console.log(err);
        return res.status(404).send(err.message);
    })
   
})




module.exports = Kseb;
