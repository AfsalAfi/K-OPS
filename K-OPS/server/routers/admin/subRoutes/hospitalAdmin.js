const express = require('express');
const { verifyPasswordHospital } = require('../../../helpers/hospital33');
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

module.exports = Hospital;
