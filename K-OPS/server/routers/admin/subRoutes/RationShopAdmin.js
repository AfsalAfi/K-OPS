const express = require("express");
const { showRationNotifications } = require("../../../helpers/user-helpers");

const {
  RationShopNotification,
  list_Enquiry_RationShop,
  update_available_stocks,
  list_available_stocks,
  reply_for_enquiry_and_report,
} = require("../../../helpers/admin-helpers");
const { protect } = require("../../../middlewares/authMiddlewareOperator");

const RationShop = express.Router();

RationShop.post("/push-notifications", protect, (req, res) => {
  const regId = req.user;
  const message = req.body.message;
  let dt = new Date();
  const date = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  const time = dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();
  RationShopNotification(message, date, time, regId)
    .then((response) => {
      return res.status(200).send({ status: "ok" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send(err.message);
    });
});

RationShop.post("/show-RationShop-notifications", protect, (req, res) => {
  const regId = req.user;
  showRationNotifications(regId)
    .then((notifications) => {
      res.status(200).send({ notifications, status: "ok" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

RationShop.post("/list-enquiry", protect, (req, res) => {
  const regId = req.user;
  list_Enquiry_RationShop(regId)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

RationShop.post("/list-available-stocks", protect, (req, res) => {
  const regId = req.user;
  list_available_stocks(regId)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

RationShop.post("/update-available-stocks", protect, (req, res) => {
  const regId = req.user;
  const cardColor = req.body.cardColor;
  const stocks = req.body.stocks;

  update_available_stocks(regId, cardColor, stocks)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

RationShop.post("/reply-for-enquiry", protect, (req, res) => {
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

module.exports = RationShop;
