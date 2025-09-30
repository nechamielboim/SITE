const { config } = require('../config/secret'); 
const jwt = require("jsonwebtoken");

// בדיקה כללית של טוקן
exports.auth = async (req, res, next) => {
    const token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "Token missing. Please provide a valid token." });
    }

    try {
        const tokenData = jwt.verify(token, config.tokenSecret);
        req.tokenData = tokenData;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token." });
    }
};

// בדיקה אם המשתמש הוא אדמין
exports.authAdmin = async (req, res, next) => {
    const token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "Token missing. Please provide a valid token." });
    }

    try {
        const tokenData = jwt.verify(token, config.tokenSecret);

        if (tokenData.role !== "admin") {
            return res.status(403).json({ msg: "Access denied. Admins only." });
        }

        req.tokenData = tokenData;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token." });
    }
};
