const express = require('express');
const { verifyPasswordKseb } = require('../../../helpers/hospital33');
const Kseb = express.Router();

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


module.exports = Kseb;
