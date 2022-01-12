"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_1 = require("../controllers/todo");
const router = (0, express_1.Router)();
router.get("/", todo_1.getTodos);
router.get("/:id", todo_1.getTodo);
router.post("/", todo_1.postTodo);
router.put("/:id", todo_1.putTodo);
router.delete("/:id", todo_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todo.js.map