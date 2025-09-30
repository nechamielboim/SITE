const mongoose = require('mongoose');
const { config } = require('../config/secret'); // dotenv כבר נטען ב-secret.js

main().catch(err => console.log(err));

async function main() {
    console.log(config); // אמור להדפיס את האובייקט עם userDb ו-passDb

    await mongoose.connect(
        `mongodb+srv://${config.userDb}:${config.passDb}@cluster0.4eju6mj.mongodb.net/test`
    );

    console.log("MongoDB connected successfully!");
}
