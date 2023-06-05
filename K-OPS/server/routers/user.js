const express = require("express");
const router = express.Router();
const {showNotifications} = require('../helpers/student-helpers')


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


router.post('/show-notifications',(req,res)=>{
    showNotifications().then(response=>{
        return res.status(200).send(response);
    }).catch(err=>{
        return res.status(404).send(err.message);

    })
})


module.exports = router;
