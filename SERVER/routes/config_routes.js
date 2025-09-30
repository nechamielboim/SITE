const siteR = require("./sites")
const userR = require("./users")
const countryR = require("./country")

exports.routesInit = (app) => {
    app.use("/site", siteR)
    app.use("/user", userR)
    app.use("/country", countryR)
}
