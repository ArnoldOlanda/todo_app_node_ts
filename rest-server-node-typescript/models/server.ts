import express, { Application } from "express";
import todosRoutes from "../routes/todo";
import cors from "cors";
import db from "../database/connection";


class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
    todos:"/api/todos"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  async dbConnection(){
      try {
          await db.authenticate();
          console.log("Database online")
      } catch (error) {
          throw error;
          
      }
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura de body
    this.app.use(express.json())
    //Carpeta publica
    this.app.use(express.static("public"))
  }

  routes() {
    //this.app.use(this.apiPaths.usuarios, userRoutes);
    this.app.use(this.apiPaths.todos,todosRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto: " + this.port);
    });
  }
}
export default Server;
