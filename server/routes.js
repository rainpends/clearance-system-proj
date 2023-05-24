const authController = require("./auth-controller")

module.exports = (app) => {

    app.post("/signup", authController.signUp)
    app.post("/login", authController.login)
    app.post("/checkifloggedin", authController.checkIfLoggedIn)
}