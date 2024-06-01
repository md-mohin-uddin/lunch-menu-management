module.exports = (sequelize, DataTypes) => {

    const Menu = sequelize.define("menu", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        serving_date: {
            type: DataTypes.DATE,
            defadefaultValue: new Date()
        }
    
    })

    return Menu
}