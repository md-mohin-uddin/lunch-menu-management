// import controllers
const menu_controller = require("../controllers/menu_controller");
const { authMiddleware, isAdminMiddleware } = require("../middlewares/auth");

// router
const router = require("express").Router();

// use routers
// add menu
router.post("/add", authMiddleware, isAdminMiddleware, menu_controller.addMenu);

// update menu
router.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  menu_controller.updateMenu
);

// get all menu list
router.get("/list", menu_controller.getAllMenus);
router.get("/list-all", menu_controller.getAllMenusForAdmin);

// Menus router
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  menu_controller.deleteMenu
);

module.exports = router;
