const express = require("express");
const { KSEB_enquries, KSEB_Report_Failures, HOSPITAL_enquries, showNotifications_KSEB, list_Available_Doctors, get_Divisions, get_Hospitals } = require("../helpers/user-helpers");
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

router.post("/list-kseb-divisions", (req, res) => {
    const district = req.body.district;
    console.log(district);
    get_Divisions(district).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})


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

router.post('/show-kseb-notifications', (req, res) => {
    const regId = req.body.regId;
    console.log(regId);
    showNotifications_KSEB(regId).then(response => {
        return res.status(200).send(response);
    }).catch(err => {
        return res.status(404).send(err.message);

    })
})



//HOSPITAL

router.post("/list-hospitals", (req, res) => {
    const district = req.body.district;
    console.log(district);
    get_Hospitals(district).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
})


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
    console.log("hospital");
    console.log(hospital);
    list_Available_Doctors(hospital).then(response => {
        console.log("123response");
        console.log(response);
        res.status(200).send(response);
    }).catch((err) => {
        res.send(err);
    })
})




module.exports = router;
