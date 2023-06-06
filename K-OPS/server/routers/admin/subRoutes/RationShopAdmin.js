const express = require('express');
const { verifyPasswordRationShop } = require('../../../helpers/hospital33');
const RationShop = express.Router();

RationShop.post("/auth", (req, res) => {
    const regId = req.body.regId;
    const password = req.body.password;
    verifyPasswordRationShop(regId, password).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})

module.exports = RationShop;
