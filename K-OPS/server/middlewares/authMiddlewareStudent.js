// const jwt = require("jsonwebtoken");
// var { getCollection } = require("../config/connection");
// const { JWT_STRING } = require("../config/tutor-config");
// const { STUDENT_DETAILS } = require("../config/db-config");


// const protect = async (req, res, next) => {
//   console.log(req.headers.authorization)
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decode = jwt.verify(token, JWT_STRING);
//       const collection = await getCollection(STUDENT_DETAILS);
//       collection
//         .aggregate([
//           {
//             $match: {
//               regNo: decode.regNo,
//             },
//           },
//           {
//             $project: {
//               regNo: 1,
//               classRoom: 1,
//               department: 1,
//               year: 1,
//               roomNo: 1,
//               hostel: 1,
//               gender: 1,
//               _id: 0,
//             },
//           },
//         ])
//         .toArray()
//         .then((response) => {
//           if (response) {
//             req.user = response;

//             next();
//           } else {
//             res.status(400);
//             throw new Error("Not authorized, token failed");
//           }
//         });
//     } catch (error) {
//       res.status(400);
//       throw new Error("Not authorized, token failed");
//     }
//   } else {
//     res.status(400);
//     throw new Error("Not authorized, token failed");
//   }
// };
// module.exports = { protect };
