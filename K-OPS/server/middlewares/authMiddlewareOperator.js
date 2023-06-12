const jwt = require("jsonwebtoken");
var { getCollection } = require("../config/connection");
const { STUDENT_DETAILS, OPERATORS_COLLECTION } = require("../config/db-config");
const { JWT_STRING_FOR_ADMIN } = require("../config/constants");


const protect = async (req, res, next) => {
    console.log(req.headers.autherization)
    if (
        req.headers.autherization &&
        req.headers.autherization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.autherization.split(" ")[1];
            const decode = jwt.verify(token, JWT_STRING_FOR_ADMIN);
            const collection = await getCollection(OPERATORS_COLLECTION);
            collection
                .aggregate([
                    {
                        $match: {
                            regId: decode.regId,
                        },
                    },
                    {
                        $project: {
                            regId: 1,
                        },
                    },
                ])
                .toArray()
                .then((response) => {
                    if (response) {
                        req.user = response.regId;
                        next();
                    } else {
                        res.status(400);
                        throw new Error("Not authorized, token failed");
                    }
                });
        } catch (error) {
            res.status(400);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(400);
        throw new Error("Not authorized, token failed");
    }
};
module.exports = { protect };
