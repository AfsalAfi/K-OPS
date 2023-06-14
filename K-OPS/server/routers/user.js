const express = require("express");
const {
  KSEB_enquries,
  KSEB_Report_Failures,
  HOSPITAL_enquries,
  showNotifications_KSEB,
  list_Available_Doctors,
  get_Divisions,
  get_Hospitals,
  list_Medical_Facilities,
  showRationNotifications,
  RationShop_enquries,
  get_Ration_Shops,
} = require("../helpers/user-helpers");
const { list_available_stocks } = require("../helpers/admin-helpers");
const router = express.Router();

//KSEB

router.post("/list-kseb-divisions", (req, res) => {
  const district = req.body.district;
  console.log(district);
  get_Divisions(district)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/kseb-enquries", (req, res) => {
  const regId = req.body.regId;
  const name = req.body.name;
  const ContactNumber = req.body.ContactNumber;
  const type = req.body.type;
  const description = req.body.description;
  const emailAddress = req.body.email;
  KSEB_enquries(regId, name, ContactNumber, type, description, emailAddress)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/kseb-report-failures", (req, res) => {
  const regId = req.body.regId;
  const place = req.body.place;
  const landMark = req.body.landMark;
  const nearByPostNumber = req.body.nearByPostNumber;
  const Complaint = req.body.Complaint;
  const timeOfHappen = req.body.timeOfHappen;
  const name = req.body.name;
  const ContactNumber = req.body.ContactNumber;
  const emailAddress = req.body.email;
  KSEB_Report_Failures(
    regId,
    place,
    landMark,
    nearByPostNumber,
    Complaint,
    timeOfHappen,
    name,
    ContactNumber,
    emailAddress
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/show-kseb-notifications", (req, res) => {
  const regId = req.body.regId;
  console.log(regId);
  showNotifications_KSEB(regId)
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((err) => {
      return res.status(404).send(err.message);
    });
});

//HOSPITAL

router.post("/list-hospitals", (req, res) => {
  const district = req.body.district;
  console.log(district);
  get_Hospitals(district)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/hospital-enquries", (req, res) => {
  const regId = req.body.regId;
  const emailAddress = req.body.email;
  const name = req.body.name;
  const ContactNumber = req.body.ContactNumber;
  const type = req.body.type;
  const description = req.body.description;
  HOSPITAL_enquries(regId, name, ContactNumber, type, description, emailAddress)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/available-doctors", (req, res) => {
  const hospital = req.body.hospital;
  console.log("hospital");
  console.log(hospital);
  list_Available_Doctors(hospital)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/medical-facilities", (req, res) => {
  const hospital = req.body.regId;
  list_Medical_Facilities(hospital)
    .then((response) => {
      res.status(200).send({ response, status: "ok" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

//RATIONSHOP

router.post("/show-RationShop-notifications", (req, res) => {
  const regId = req.body.regId;
  showRationNotifications(regId)
    .then((notifications) => {
      res.status(200).send({ notifications, status: "ok" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.post("/RationShop-enquries", (req, res) => {
  const regId = req.body.regId;
  const name = req.body.name;
  const ContactNumber = req.body.ContactNumber;
  const type = req.body.type;
  const description = req.body.description;
  const emailAddress = req.body.email;
  RationShop_enquries(
    regId,
    name,
    ContactNumber,
    type,
    description,
    emailAddress
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/list-available-stocks", (req, res) => {
  const regId = req.body.regId;
  console.log(regId);
  list_available_stocks(regId)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/list-ration-shops", (req, res) => {
  const district = req.body.district;
  console.log(district);
  get_Ration_Shops(district)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
