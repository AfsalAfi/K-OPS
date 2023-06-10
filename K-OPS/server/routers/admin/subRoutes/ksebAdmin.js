const express = require('express');
const { pushNotifications, list_Notifications, list_failures, list_Enquiry, list_Enquiry_KSEB, reply_for_enquiry_and_report } = require('../../../helpers/admin-helpers');
const Kseb = express.Router();


Kseb.post('/push-notifications', (req, res) => {
    const message = req.body.message;
    const regId = req.body.regId;
    let dt = new Date()
    const date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
    const time = dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();
    pushNotifications(regId, message, date, time).then(response => {
        return res.status(200).send({ status: "ok" });
    }).catch(err => {
        console.log(err);
        return res.status(404).send(err.message);
    })
})

Kseb.post('/list-notifications', (req, res) => {
    const regId = req.body.regId;
    list_Notifications(regId).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Kseb.post('/list-failures', (req, res) => {
    const regId = req.body.regId;
    list_failures(regId).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Kseb.post('/list-enquiry', (req, res) => {
    const regId = req.body.regId;
    list_Enquiry_KSEB(regId).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Kseb.post('/reply-for-enquiry-and-report', (req, res) => {
    const email = req.body.email;
    const message = req.body.message;
    const subject = req.body.subject;
    reply_for_enquiry_and_report(email, message, subject).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})








module.exports = Kseb;
