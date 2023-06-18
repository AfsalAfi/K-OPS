const express = require('express');

const { RationShopNotification,
    list_Enquiry_RationShop,
    update_available_stocks,
    list_available_stocks,
    reply_for_enquiry_and_report,
    decrement_QueueSTATUS,
    increment_QueueSTATUS } = require('../../../helpers/admin-helpers');

const RationShop = express.Router();


RationShop.post('/push-notifications', (req, res) => {
    const regId = req.body.regId;
    const message = req.body.message;
    let dt = new Date()
    const date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
    const time = dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();
    RationShopNotification(message, date, time, regId).then(response => {
        return res.status(200).send({ status: "ok" });
    }).catch(err => {
        console.log(err);
        return res.status(404).send(err.message);
    })
})

RationShop.post('/list-enquiry', (req, res) => {
    const regId = req.body.regId;
    list_Enquiry_RationShop(regId).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

RationShop.post('/list-available-stocks', (req, res) => {
    const regId = req.body.regId;
    list_available_stocks(regId).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

RationShop.post('/update-available-stocks', (req, res) => {
    const regId = req.body.regId;
    const white = req.body.white;
    const blue = req.body.blue;
    const red = req.body.red;
    const yellow = req.body.yellow;
    update_available_stocks(regId, white, blue, red, yellow).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

RationShop.post('/reply-for-enquiry', (req, res) => {
    const email = req.body.email;
    const message = req.body.message;
    const subject = req.body.subject;
    reply_for_enquiry_and_report(email, message, subject).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})


RationShop.post('/queue-incrementing',(req,res)=>{
    const regId = req.body.regId;
    increment_QueueSTATUS(regId).then(response=>{
        return res.status(200).send({response, status:"ok" })

    }).catch(err=>{
        return res.status(500).send(err.message)
    })


})

RationShop.post('/queue-decrementing',(req,res)=>{
    const regId = req.body.regId;
    decrement_QueueSTATUS(regId).then(response=>{
        return res.status(200).send({response, status:"ok"})

    }).catch(err=>{
        return res.status(500).send(err.message)
    })


})





module.exports = RationShop;
