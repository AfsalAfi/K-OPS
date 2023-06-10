const express = require('express');
const { verifyPasswordHospital,increment_OPSTATUS ,decrement_OPSTATUS,} = require('../../../helpers/admin-helpers');
const { list_Available_Doctors } = require('../../../helpers/user-helpers')
const Hospital = express.Router();

Hospital.post("/auth", (req, res) => {
    const regId = req.body.regId;
    const password = req.body.password;
    verifyPasswordHospital(regId, password).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Hospital.post('/op-ticket-status',(req,res)=>{
    const hospital = req.body.hospital;
    list_Available_Doctors(hospital).then(response=>{
        res.status(200).send(response);
        console.log(response);
    }).catch(err=>{
        res.status(404).send(err);
    })

})


Hospital.post('/op-ticket-incrementing',(req,res)=>{
    const doctor_id = req.body.doctor_id;
    increment_OPSTATUS(doctor_id).then(response=>{
        return res.status(200).send({response, status:"ok" })

    }).catch(err=>{
        return res.status(500).send(err.message)
    })


})

Hospital.post('/op-ticket-decrementing',(req,res)=>{
    const doctor_id = req.body.doctor_id;
    decrement_OPSTATUS(doctor_id).then(response=>{
        return res.status(200).send({response, status:"ok"})

    }).catch(err=>{
        return res.status(500).send(err.message)
    })


})

module.exports = Hospital;
