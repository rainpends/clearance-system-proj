const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

//  get user model registered in Mongoose
const User = mongoose.model("user")

exports.signUp = async (req, res) => {
    try{
        const {fname, mname, lname, suffix, studentno, userType, email, password, applications, adviser} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.send({success: false})
        }

        const newuser = new User({
            fname,
            mname,
            lname,
            suffix,
            studentno,
            userType,
            email,
            password,
            applications,
            adviser
        })

        await newuser.save()

        res.send({success: true})
    }
    catch (err) {
        return res.send({success: false})
    }
}

exports.login = (req, res) => {

}

exports.checkIfLoggedIn = (req, res) => {

}