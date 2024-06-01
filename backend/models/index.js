
const dbConfig = require('../config/dbConfig.js');

const {Sequelize,DataTypes} =  require('sequelize');

const sequelize = new Sequelize (
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases : false,

       pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle,
       }
    }
)

// Testing the connection
sequelize.authenticate()
.then(()=>{
    console.log('connected...')
})
.catch(err=>{
    console.log('Error'+err)
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.menus =require('./menu_model.js')(sequelize,DataTypes)
db.users =require('./user_model.js')(sequelize,DataTypes)
db.employee_menus =require('./employee_menu_model.js')(sequelize,DataTypes)

db.sequelize.sync({force: false})
.then(()=>{
    console.log('yes re-sync done')
})


module.exports = db;
