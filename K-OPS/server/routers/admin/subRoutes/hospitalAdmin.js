const express = require("express");
const {
  list_Enquiry_Hospital,
  reply_for_enquiry_and_report,
  create_Doctor,
  verifyPasswordHospital,
  increment_OPSTATUS,
  decrement_OPSTATUS,
} = require("../../../helpers/admin-helpers");
const {
  list_Medical_Facilities,
  update_Medical_Facilities,
  list_Available_Doctors,
} = require("../../../helpers/user-helpers");
const { protect } = require("../../../middlewares/authMiddlewareOperator");

const Hospital = express.Router();

Hospital.post("/list-enquiry", protect, (req, res) => {
  const regId = req.user;
  list_Enquiry_Hospital(regId)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

Hospital.post("/available-doctors", protect, (req, res) => {
  const hospital = req.user;
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

Hospital.post("/op-ticket-status", protect, (req, res) => {
  const hospital = req.user;
  list_Available_Doctors(hospital)
    .then((response) => {
      res.status(200).send(response);
      console.log(response);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

Hospital.post("/op-ticket-incrementing", protect, (req, res) => {
  const doctor_id = req.body.doctor_id;
  increment_OPSTATUS(doctor_id)
    .then((response) => {
      return res.status(200).send({ response, status: "ok" });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
});

Hospital.post("/op-ticket-decrementing", protect, (req, res) => {
  const doctor_id = req.body.doctor_id;
  decrement_OPSTATUS(doctor_id)
    .then((response) => {
      return res.status(200).send({ response, status: "ok" });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
});

Hospital.post("/reply-for-enquiry-and-report", protect, (req, res) => {
  const email = req.body.email;
  const message = req.body.message;
  const subject = req.body.subject;
  reply_for_enquiry_and_report(email, message, subject)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

Hospital.post("/add-newDoctor", protect, (req, res) => {
  const name = req.body.name;
  const specialization = req.body.specialization;
  const availableTimeFrom = req.body.availableTimeFrom;
  const availableTimeTo = req.body.availableTimeTo;
  const hospital = req.user;
  const doctor_id = req.body.doctor_id;
  create_Doctor(
    name,
    specialization,
    availableTimeFrom,
    availableTimeTo,
    hospital,
    doctor_id
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

Hospital.post("/list-medical-facilities", protect, (req, res) => {
  const hospital = req.user;
  list_Medical_Facilities(hospital)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

Hospital.post("/update-medical-facilities", protect, (req, res) => {
  const regId = req.user;
  const facilities = req.body.facilities;
  const equipments = req.body.equipments;
  update_Medical_Facilities(regId, facilities, equipments)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

module.exports = Hospital;
