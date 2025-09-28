const siteR = require("./sites")

exports.routesInit=(app)=>{
    app.use("/site",siteR)
}

