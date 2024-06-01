const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/userController");
const { ApiError } = require("../utis/error");

const authMiddleware = async (req, res, next) => {
  const authorization =
    req.headers.authorization !== undefined
      ? req.headers.authorization.split(" ")
      : [];

  if (!authorization[1]) {
    return res.status(401).send({ status: false, message: "Unauthorized" });
  }

  const decoded = jwt.verify(authorization[1], process.env.JWT_SECRET);

  const user = await getUserById(decoded.id);

  req.user = user;

  next();

  //   const user = await userDao.findOneByWhere({ id: payload.sub });
};

const isAdminMiddleware = async (req, res, next) => {
  if (req.user.user_type !== 1) {
    return next(new ApiError(500, "Not Allowed"));
  }

  next();
};

module.exports = {
  authMiddleware,
  isAdminMiddleware,
};
