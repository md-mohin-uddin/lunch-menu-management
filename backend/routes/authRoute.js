const router = require("express").Router();

const user_controller = require("../controllers/userController");

// router
// User router
router.post("/login", user_controller.loginUser);
router.post("/register", user_controller.addUser);

module.exports = router;
