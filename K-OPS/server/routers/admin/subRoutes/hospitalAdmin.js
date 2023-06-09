const express = require('express');
const { list_Enquiry_Hospital, reply_for_enquiry_and_report, create_Doctor } = require('../../../helpers/admin-helpers');
const { list_Medical_Facilities, update_Medical_Facilities } = require('../../../helpers/user-helpers');
const Hospital = express.Router();



Hospital.post('/list-enquiry', (req, res) => {
    const regId = req.body.regId;
    list_Enquiry_Hospital(regId).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Hospital.post('/reply-for-enquiry-and-report', (req, res) => {
    const email = req.body.email;
    const message = req.body.message;
    const subject = req.body.subject;
    reply_for_enquiry_and_report(email, message, subject).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Hospital.post('/add-newDoctor', (req, res) => {
    const name = req.body.name;
    const specialization = req.body.specialization;
    const availableTimeFrom = req.body.availableTimeFrom;
    const availableTimeTo = req.body.availableTimeTo;
    const hospital = req.body.hospital;
    const doctor_id = req.body.doctor_id;
    create_Doctor(name, specialization, availableTimeFrom, availableTimeTo, hospital, doctor_id)
        .then((response) => {
            res.send(response);
        }).catch((err) => {
            res.send(err);
        })
})

Hospital.post('/list-medical-facilities', (req, res) => {
    const hospital = req.body.regId;
    list_Medical_Facilities(hospital).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

Hospital.post('/update-medical-facilities', (req, res) => {
    const regId = req.body.regId;
    const facilities = req.body.regId;
    const equipments = req.body.regId;
    update_Medical_Facilities(regId, facilities, equipments).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err.message)
    })
})







module.exports = Hospital;
