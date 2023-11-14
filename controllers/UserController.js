const { user } = require("../models");
const { decryptPwd, encryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jsonwebtoken");
const { Op } = require("sequelize");

class UserController {
  static async getUsers(req, res) {
    try {
      const username = req.query.username
      let config = {
        order: [
          ['id', 'ASC']
        ]
      }
      if (username) {
        config = {
          where: {
            username: {
              [Op.substring]: username
            }
          },
          order: [
            ['id', 'ASC']
          ]
        }
      }
      const users = await user.findAll(config);
      res.status(200).send({ message: `Success Get Users`, data: users });
    } catch (error) {
      res.status(500).send({ message: `Error Get Users`, error });
    }
  }
  static async getUserById(req, res) {
    try {
      const id = +req.params.id;
      const userById = await user.findByPk(id);
      res.status(200).send({ message: `Success Get User by Id`, data: userById });
    } catch (error) {
      res.status(500).send({ message: `Error Get User by Id`, error });
    }
  }
  static async profile(req, res) {
    try {
      const id = +req.body.userData.id;
      const { username, email, fullname, avatar, address, isAdmin } = await user.findByPk(id);
      res.status(200).send({ message: `Success Get Profile`, data: { username, email, fullname, avatar, address, isAdmin, id } });
    } catch (error) {
      res.status(500).send({ message: `Error Get Profile`, error });
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const usernameFound = await user.findOne({ where: { username: username } });
      if (!usernameFound) {
        throw `Username is wrong !`;
      }
      if (decryptPwd(password, usernameFound.password)) {
        const { username, email, fullname, avatar, address, isAdmin } = usernameFound;
        const access_token = tokenGenerator(usernameFound);
        res.status(200).send({
          message: `Success Login`,
          data: {
            access_token,
            userInfo: {
              username,
              email,
              fullname,
              avatar,
              address,
              isAdmin,
            }
          },
        });
      } else {
        throw `Password is Wrong !`;
      }
    } catch (error) {
      res.status(500).send({ message: `Error Login`, error });
    }
  }
  static async register(req, res) {
    try {
      const { username, fullname, password, avatar, email, address, isAdmin } = req.body;
      console.log(req.body);
      const newUser = await user.create({
        username,
        fullname,
        password,
        avatar,
        email,
        address,
        isAdmin,
      });
      res.status(200).send({ message: `Success Create User`, data: newUser });
    } catch (error) {
      res.status(500).send({ message: `Error Create User`, error });
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const deletedUser = await user.findByPk(id);
      if (!deletedUser) {
        throw `User id ${id} does not exist !`;
      }
      await user.destroy({ where: { id: id } });
      res.status(500).send({ message: `Success Delete User`, deletedData: deletedUser });
    } catch (error) {
      res.status(500).send({ message: `Error Delete User`, error });
    }
  }
  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { username, fullname, avatar, email, address } = req.body;
      const oldUser = await user.findByPk(id);
      await user.update(
        {
          username,
          fullname,
          avatar,
          email,
          address,
        },
        { where: { id: id } }
      );
      const updatedUser = await user.findByPk(id);
      if (!oldUser || !updatedUser) {
        throw `User id ${id} does not exist !`;
      }
      res.status(200).send({ message: `Success Update User`, oldData: oldUser, updatedData: updatedUser });
    } catch (error) {
      res.status(500).send({ message: `Error Update User`, error });
    }
  }
  static async changePassword(req, res) {
    try {
      const id = +req.params.id;
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const selectedUser = await user.findByPk(id);
      if (!decryptPwd(oldPassword, selectedUser.password)) {
        throw `Wrong Old Password`;
      }
      if (newPassword !== confirmNewPassword) {
        throw `New password must be the same with confirm password`;
      }
      if (oldPassword === newPassword) {
        throw `New password must not be the same with old password`;
      }
      await user.update({ password: encryptPwd(newPassword) }, { where: { id: id } });
      res.status(200).send({ message: `Success Change Password` });
    } catch (error) {
      res.status(500).send({ message: `Error Change Password`, error });
    }
  }
}

module.exports = UserController;
