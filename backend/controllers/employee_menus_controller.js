const Op = require("sequelize").Op;
const db = require("../models");

// create main model
const EmployeeMenus = db.employee_menus;

// 1. create employee

const addEmployeeMenus = async (req, res) => {
  try {
    const newEmployeeMenuInfo = {
      username: req.user.username,
      user_id: req.user.id,
      menu_id: req.body.menu_id,
      menu_name: req.body.menu_name,
    };

    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();

    // DELETE PREVIOUS SELECTED MENU FOR TODAY IN ANY
    await EmployeeMenus.destroy({
      where: {
        user_id: req.user.id,
        createdAt: {
          [Op.between]: [TODAY_START, NOW],
        },
      },
    });

    const newEmployeeMenu = await EmployeeMenus.upsert(newEmployeeMenuInfo);

    if (newEmployeeMenu) {
      return res.status(200).send({ status: true, message: "Menu Item Saved" });
    }

    res
      .status(500)
      .send({ status: false, message: "Failed to create employee menus" });
  } catch (err) {
    console.log({ err });
    res
      .status(500)
      .send({ status: false, message: "Failed to create employee menus" });
  }
};

const getAllEmployeeMenus = async (req, res) => {
  console.log({ req });
  try {
    let employee_menus = await EmployeeMenus.findAll({});
    res.status(200).send(employee_menus);
  } catch (err) {
    console.log({ err });
    res.status(500).send({ status: false, message: "Failed to get list" });
  }
};

const getSelectedMenu = async (req, res) => {
  try {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    const selectedMenu = await EmployeeMenus.findOne({
      where: {
        user_id: req.user.id,
        createdAt: {
          [Op.between]: [TODAY_START, NOW],
        },
      },
    });

    if (selectedMenu) {
      return res
        .status(200)
        .send({ status: true, message: "Menu Item Found", data: selectedMenu });
    }

    return res
      .status(200)
      .send({ status: true, message: "No selected Item", data: null });
  } catch (err) {
    console.log({ err });

    res
      .status(500)
      .send({ status: false, message: "Failed to create employee menus" });
  }
};

module.exports = {
  addEmployeeMenus,
  getAllEmployeeMenus,
  getSelectedMenu,
};
