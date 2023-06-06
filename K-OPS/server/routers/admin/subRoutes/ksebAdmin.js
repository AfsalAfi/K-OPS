const express = require('express');
const { verifyPasswordKseb } = require('../../../helpers/admin-helpers');
const Kseb = express.Router();
const { updateNotifications,
} = require('../../../helpers/admin-helpers')

Kseb.post("/auth", (req, res) => {
    const regId = req.body.regId;
    const password = req.body.password;
    verifyPasswordKseb(regId, password).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

Kseb.post("/list-division-byDistrict", async (req, res) => {

})

Kseb.post("/get-division-details", async (req, res) => {

})


Kseb.post('/push-notifications', (req, res) => {

    const message = req.body.message;
    console.log(message);
    varifiedBy = "KERALA STATE ELECTRICITY BOARD";
    let dt = new Date()
    const date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
    const time = dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();

    updateNotifications(message, varifiedBy, date, time).then(response => {
        return res.status(200).send({ status: "ok" });
    }).catch(err => {
        console.log(err);
        return res.status(404).send(err.message);
    })

})




module.exports = Kseb;
