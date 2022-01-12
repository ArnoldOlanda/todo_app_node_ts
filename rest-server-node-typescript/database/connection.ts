import { Sequelize } from "sequelize";

const db=new Sequelize('todos_app','root','admin',{
    host:'localhost',
    dialect:'mysql'
})

export default db;