var jwt = require("jsonwebtoken");
const privateKey = process.env.jwtSecret;
const { promisify } = require("util");

const createJwt = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { expiresIn: 60 * 60 }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const jwtVerify = async ({ token }) => {
  try {
    const jwtVerifyAsync = promisify(jwt.verify);
    const decoded = await jwtVerifyAsync(token, privateKey);
    return decoded;
  } catch (err) {
    throw err;
  }
};

module.exports = { createJwt, jwtVerify };
