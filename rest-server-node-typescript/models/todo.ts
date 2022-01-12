import { DataTypes } from "sequelize";
import db from "../database/connection";

const Todo=db.define('Todo',{
    titulo:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    terminada:{
        type:DataTypes.BOOLEAN
    },
})

export default Todo;