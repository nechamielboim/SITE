// קודם טען את ה-env
require("dotenv").config();

exports.config = {
    userDb: process.env.USER_DB,
    passDb: process.env.PASS_DB,
    test: process.env.TEST,
    port: process.env.PORT,
    tokenSecret: process.env.TOKEN_SECRET
};
