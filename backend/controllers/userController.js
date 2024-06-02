const bcryptjs = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { USER_TYP_EMPLOYEE } = require("../utis/constant");

// create Model
const User = db.users;

// create/register user

const addUser = async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: bcryptjs.hashSync(req.body.password, 8),
      user_type: USER_TYP_EMPLOYEE,
    };

    const newUser = await User.create(userInfo);

    if (newUser) {
      res.status(200).send({ message: "registration successful" });
    }
  } catch (err) {
    console.log({ err });
    res.status(500).send({ message: "Something went wrong" });
  }
};

//login user

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ where: { username: username } });

    if (!user) {
      res.status(500).send({
        status: false,
        code: 500,
        message: "User not found",
      });
    }

    user = user.toJSON();

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(500).send({
        status: false,
        code: 500,
        message: "Invalid credentails",
      });
    }

    delete user.password;

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).send({
      status: true,
      token,
      message: "Login Success",
      data: { ...user },
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      status: false,
      code: 500,
      message: "Something went wrong",
    });
  }
};

const getUserById = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  return user.toJSON();
};

module.exports = {
  addUser,
  loginUser,
  getUserById,
};
