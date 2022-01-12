import { Request, Response } from "express";
import Todo from "../models/todo";


export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.findAll({ where:{ terminada:0 } });
  res.json( todos );
};

export const getTodo = async(req: Request, res: Response) => {

  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if(todo){
    res.json( todo );
  } else res.status(404).json({msg:`No existe la tarea con el id ${id}`})
};

export const postTodo = async(req: Request, res: Response) => {
  const { body } = req;
  try {

    const todo=await Todo.create(body);
    res.json(todo)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg:'Ha ocurrido un error en el servidor hable con el administrador'})
  }
};

export const putTodo = async(req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const todo=await Todo.findByPk(id)
    if(!todo){
      return res.status(404).json({
        msg:`No existe una tarea con el id ${id}`
      })
    }
    await todo.update(body);
    res.json(todo)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg:'Ha ocurrido un error en el servidor hable con el administrador'})
  }
};

export const deleteTodo =async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo=await Todo.findByPk(id)
    if(!todo){
      return res.status(404).json({
        msg:`No existe una tarea con el id ${id}`
      })
    }
    //Eliminacion logica
    // await todo.update({
    //   estado:false
    // })
    await todo.destroy(); //Eliminacion fisica
    res.json(todo)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg:'Ha ocurrido un error en el servidor hable con el administrador'})
  }
};
