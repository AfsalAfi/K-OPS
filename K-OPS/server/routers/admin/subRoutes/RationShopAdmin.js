const express = require('express');
const { verifyPasswordRationShop,
        RationShopNotification, } = require('../../../helpers/admin-helpers');
const RationShop = express.Router();
const {RATION_NOTIFICATIONS} = require('../../../config/db-config')

RationShop.post("/auth", (req, res) => {
    const regId = req.body.regId;
    const password = req.body.password;
    verifyPasswordRationShop(regId, password).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

RationShop.post('/push-notifications',(req,res)=>{
    const shopNumber = req.body.shopNumber;
    const message = req.body.message;
    varifiedBy = "SUPPLYCO OFFICE";
    let dt = new Date()
    const date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
    const time = dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();

    RationShopNotification(message, varifiedBy, date, time,shopNumber).then(response => {
        return res.status(200).send({ status: "ok" });
    }).catch(err => {
        console.log(err);
        return res.status(404).send(err.message);
    })
})

module.exports = RationShop;
