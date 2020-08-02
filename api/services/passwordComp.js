const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

let passwordCompare = function(model) {
  model.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  model.methods.comparePassword = function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
  };
};

module.exports = { passwordCompare };
