const express = require('express');
const Kseb = express.Router();

// Kseb.post("/", protect, async (req, res) => {
//     const regNo = req.user[0].regNo;
//     const hostel = req.user[0].hostel;
//     get_my_Hostel_Details(regNo, hostel).then(response => {
//         res.send(response);
//     }).catch(err => {
//         res.send(err);
//     })
// })

module.exports = Kseb;
