const express = require("express");
const { KSEB_enquries, KSEB_Report_Failures, HOSPITAL_enquries } = require("../helpers/user-helpers");
const router = express.Router();


// router.post("/", protect, async (req, res) => {
//   const regNo = req.user[0].regNo;
//   get_my_details(regNo)
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });






//KSEB

router.post("/kseb-enquries", (req, res) => {
    const divisionMail = req.body.divisionMail;
    const name = req.body.name;
    const ContactNumber = req.body.ContactNumber;
    const type = req.body.type;
    const description = req.body.description;
    KSEB_enquries(name, ContactNumber, type, description, divisionMail).then(response => {
        res.status(200).send(response);
    }).catch((err) => {
        res.send(err);
    })
});

router.post("/kseb-report-failures", (req, res) => {
    const divisionMail = req.body.divisionMail;
    const place = req.body.place;
    const landMark = req.body.landMark;
    const nearByPostNumber = req.body.nearByPostNumber;
    const Complaint = req.body.Complaint;
    const timeOfHappen = req.body.timeOfHappen;
    const name = req.body.name;
    const ContactNumber = req.body.ContactNumber;
    KSEB_Report_Failures(divisionMail, place, landMark, nearByPostNumber, Complaint, timeOfHappen, name, ContactNumber).then(response => {
        res.status(200).send(response);
    }).catch((err) => {
        res.send(err);
    })
});



//HOSPITAL

router.post("/hospital-enquries", (req, res) => {
    const divisionMail = req.body.divisionMail;
    const name = req.body.name;
    const ContactNumber = req.body.ContactNumber;
    const type = req.body.type;
    const description = req.body.description;
    HOSPITAL_enquries(name, ContactNumber, type, description, divisionMail).then(response => {
        res.status(200).send(response);
    }).catch((err) => {
        res.send(err);
    })
});

router.post("/available-doctors", (req, res) => {
    const hospital = req.body.hospital;
    list_Available_Doctors(hospital);
})


router.post("/available-doctors", (req, res) => {
    const divisionMail = req.body.divisionMail;
    const name = req.body.name;
    const ContactNumber = req.body.ContactNumber;
    const type = req.body.type;
    const description = req.body.description;
    HOSPITAL_enquries(name, ContactNumber, type, description, divisionMail).then(response => {
        res.status(200).send(response);
    }).catch((err) => {
        res.send(err);
    })
});

module.exports = router;
