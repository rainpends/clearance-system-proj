import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  fname: {type: String, required: true},
  mname: {type: String, required: false},
  lname: {type: String, required: true},
  studentno: {type: String, required: true},
  userType: {type: String, enum: ["student", "approver", "admin"], required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  applications: [
      {type: mongoose.Schema.Types.ObjectId, ref: "application"}
  ],
  adviser: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
})

UserSchema.pre("save", function(next) {
  const user = this

  if(!user.isModified("password")) return next()

  //  This return statement returns a modified version of the user document wherein the value of the password field is salted and hashed
  //  This is the version of the document that will be saved in the database
  return bcrypt.genSalt((saltError, salt) => {
      if(saltError) {return next(saltError)}

      return bcrypt.hash(user.password, salt, (hashError, hash) => {
          if(hashError) {return next(hashError)}

          user.password = hash
          return next()
      })
  })
})

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback)
}

mongoose.model("User", UserSchema);
