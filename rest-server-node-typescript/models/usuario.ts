import { DataTypes } from "sequelize";
import db from "../database/connection";

const Usuario=db.define('Usuario',{
    nombre:{
        type:DataTypes.STRING
    },
    apellido_paterno:{
        type:DataTypes.STRING
    },
    apellido_materno:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN
    }
})

export default Usuario;