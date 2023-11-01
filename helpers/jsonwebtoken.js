const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE || "pokopedia";

const tokenGenerator = (data) => {
  const { id, username, email, fullname, avatar, address, isAdmin } = data;
  return jwt.sign({ id, username, email, fullname, avatar, address, isAdmin }, secretCode);
};

const tokenVerifier = (data) => {
  return jwt.verify(data, secretCode);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
