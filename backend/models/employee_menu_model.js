module.exports = (sequelize,DataTypes)=>{
    const EmployeeMenus = sequelize.define("employee_menus",{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        menu_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        menu_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
       
    })
    return EmployeeMenus
}