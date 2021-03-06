"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Todo = connection_1.default.define('Todo', {
    titulo: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    terminada: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Todo;
//# sourceMappingURL=todo.js.map