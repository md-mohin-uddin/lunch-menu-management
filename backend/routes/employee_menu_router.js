// import controllers  employees

const employeeMenuController = require("../controllers/employee_menus_controller");
const { authMiddleware } = require("../middlewares/auth");

// router
const router = require("express").Router();
// Employee router
router.post(
  "/lunch-item",
  authMiddleware,
  employeeMenuController.addEmployeeMenus
);

// get saved employee menu list
router.get("/lunch-item", employeeMenuController.getAllEmployeeMenus);

// get employee selected menu
router.get(
  "/selected-lunch-item",
  authMiddleware,
  employeeMenuController.getSelectedMenu
);

module.exports = router;
