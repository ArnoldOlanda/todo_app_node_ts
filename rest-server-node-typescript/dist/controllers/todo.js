"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.putTodo = exports.postTodo = exports.getTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_1.default.findAll({ where: { terminada: 0 } });
    res.json(todos);
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_1.default.findByPk(id);
    if (todo) {
        res.json(todo);
    }
    else
        res.status(404).json({ msg: `No existe la tarea con el id ${id}` });
});
exports.getTodo = getTodo;
const postTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const todo = yield todo_1.default.create(body);
        res.json(todo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error en el servidor hable con el administrador' });
    }
});
exports.postTodo = postTodo;
const putTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const todo = yield todo_1.default.findByPk(id);
        if (!todo) {
            return res.status(404).json({
                msg: `No existe una tarea con el id ${id}`
            });
        }
        yield todo.update(body);
        res.json(todo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error en el servidor hable con el administrador' });
    }
});
exports.putTodo = putTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield todo_1.default.findByPk(id);
        if (!todo) {
            return res.status(404).json({
                msg: `No existe una tarea con el id ${id}`
            });
        }
        //Eliminacion logica
        // await todo.update({
        //   estado:false
        // })
        yield todo.destroy(); //Eliminacion fisica
        res.json(todo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error en el servidor hable con el administrador' });
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.js.map