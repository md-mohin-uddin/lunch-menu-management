const Op = require("sequelize").Op;
const db = require("../models");

const Menu = db.menus;

const addMenu = async (req, res) => {
  try {
    const info = {
      name: req.body.name,
      serving_date: req.body.serving_date,
    };

    const newMenu = await Menu.create(info);
    if (newMenu) {
      return res
        .status(200)
        .send({ status: true, message: "Menu addes successfully" });
    }

    res.status(500).send({ status: false, message: "Failed to add menu" });
  } catch (err) {
    res.status(500).send({ status: false, message: "Failed to add menu" });
  }
};

//get todays menus for employee to choose
const getAllMenus = async (req, res) => {
  try {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    const menus = await Menu.findAll({
      where: {
        serving_date: {
          [Op.between]: [TODAY_START, NOW],
        },
      },
    });

    res.status(200).send(menus);
  } catch (err) {
    console.log(err);

    res.status(500).send({ status: false, message: "Something went wrong" });
  }
};

// update menu

const updateMenu = async (req, res) => {
  try {
    const id = req.params.id;

    const update = await Menu.update(req.body, { where: { id: id } });

    if (update) {
      return res
        .status(200)
        .send({ status: true, message: "Menu updated successfully" });
    }

    res.status(500).send({ status: false, message: "Failed to update menu" });
  } catch (err) {
    console.log({ err });

    res.status(500).send({ status: false, message: "Failed to update menu" });
  }
};

// delete menu
const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;

    const isDeleted = await Menu.destroy({ where: { id: id } });

    if (isDeleted) {
      return res.status(200).send({ status: true, message: "Item deleted" });
    }

    res.status(500).send({ status: false, message: "Failed to delete menu" });
  } catch (err) {
    console.log({ err });

    res.status(500).send({ status: false, message: "Failed to delete menu" });
  }
};

module.exports = {
  addMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
};
