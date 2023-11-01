const { tokenVerifier } = require("../helpers/jsonwebtoken");
const { user } = require("../models");
const bcrypt = require("bcrypt");

const isAdmin = async (req, res, next) => {
  try {
    console.log("isAdmin going");
    const access_token = req.headers.access_token;
    const adminData = tokenVerifier(access_token);
    const adminFound = await user.findByPk(adminData.id);
    if (adminFound.isAdmin) {
      req.body.adminData = adminData;
      next();
    } else {
      throw `Only admin is allowed this content`;
    }
  } catch (error) {
    res.status(403).send({ message: `Error Admin Authorization`, error });
  }
};

const isLogin = async (req, res, next) => {
  try {
    console.log("isLogin going");
    const access_token = req.headers.access_token;
    const userData = tokenVerifier(access_token);
    const userFound = await user.findByPk(userData.id);
    if (userFound) {
      req.body.userData = userData;
      next();
    }
  } catch (error) {
    res.status(403).send({ message: `Error Login Authorization, you must Login first to see this content`, error });
  }
};

const isRegistered = async (req, res, next) => {
  try {
    console.log("isRegistered going");
    const { username, email } = req.body;
    const usernameFound = await user.findOne({ where: { username: username } });
    const emailFound = await user.findOne({ where: { email: email } });
    if (usernameFound) {
      throw `Username already in use or registered`;
    }
    if (emailFound) {
      throw `Email already in use or registered`;
    }
    next();
  } catch (error) {
    res.status(403).send({ message: `Error Register Authorization`, error });
  }
};

module.exports = { isAdmin, isLogin, isRegistered };
