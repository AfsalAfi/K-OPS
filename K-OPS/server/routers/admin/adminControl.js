const express = require("express");
const router = express.Router();
const RationShop = require("./subRoutes/RationShopAdmin");
router.use("/ration-shop", RationShop);

const Hospital = require("./subRoutes/hospitalAdmin");
router.use("/hospital", Hospital);

const Kseb = require("./subRoutes/ksebAdmin");
router.use("/kseb", Kseb);


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


module.exports = router;
