const express = require("express");
const router = express.Router();
const RationShop = require("./subRoutes/RationShopAdmin");
router.use("/ration-shop", RationShop);

const Hospital = require("./subRoutes/hospitalAdmin");
router.use("/hospital", Hospital);

const Kseb = require("./subRoutes/ksebAdmin");
const {
  self_auth,
  create_kseb_division,
  create_hospital,
  create_ration_shop,
  verifyPasswordOperator,
} = require("../../helpers/admin-helpers");
router.use("/kseb", Kseb);

router.post("/self-auth", async (req, res) => {
  const regId = req.body.regId;
  const password = req.body.password;
  self_auth(regId, password)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/operators-auth", (req, res) => {
  const regId = req.body.regId;
  const password = req.body.password;
  verifyPasswordOperator(regId, password)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/create-kseb-division", async (req, res) => {
  const regId = req.body.regId;
  const password = req.body.password;
  const district = req.body.district;
  const division = req.body.division;
  const place = req.body.place;
  const contact = req.body.contact;
  const email = req.body.email;
  const officer = req.body.officer;
  const classify = "Kseb";
  create_kseb_division(
    regId,
    password,
    district,
    division,
    place,
    contact,
    email,
    officer,
    classify
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/create-hospital", async (req, res) => {
  const classify = "Hospital";
  const category = req.body.category;
  const district = req.body.district;
  const place = req.body.place;
  const email = req.body.email;
  const contact = req.body.contact;
  const name = req.body.name;
  const password = req.body.password;
  const regId = req.body.regId;
  console.log(classify,category,district,place,email,contact,name,password);
  create_hospital(
    classify,
    category,
    district,
    place,
    email,
    contact,
    name,
    password,
    regId
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/create-ration-shop", async (req, res) => {
  const regId = req.body.regId;
  const password = req.body.password;
  const district = req.body.district;
  const place = req.body.place;
  const contact = req.body.contact;
  const email = req.body.email;
  const RationShopName = req.body.RationShopName;
  const classify = "RationShop";
  create_ration_shop(
    regId,
    password,
    district,
    place,
    contact,
    email,
    RationShopName,
    classify
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
