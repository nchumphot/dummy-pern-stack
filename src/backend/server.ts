import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { client } from "./db";

dotenv.config();

const app = express();

client.connect().then(() => {
  console.log("Connected to Heroku database!");
  app.use(express.json());
  app.use(cors());

  app.get("/todos", async (req, res) => {
    const getAllTodos = await client.query("SELECT * FROM todo;");
    res.status(200).json({
      status: "success",
      data: {
        getAllTodos,
      },
    });
  });

  app.get("/todos/:todo_id", async (req, res) => {
    const todo_id = parseInt(req.params.todo_id);
    const getTodoById = await client.query(
      "SELECT * FROM todo WHERE id = $1;",
      [todo_id]
    );
    if (getTodoById.rowCount !== 0) {
      res.status(200).json({
        status: "success",
        data: {
          getTodoById,
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        data: {
          id: "Could not find a todo with that id identifier",
        },
      });
    }
  });

  app.delete("/todos/:todo_id", async (req, res) => {
    const todo_id = parseInt(req.params.todo_id);
    const deletedTodo = await client.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [todo_id]
    );
    res.status(200).json({
      status: "success",
      data: {
        deletedTodo,
      },
    });
  });

  app.listen(5000, () => {
    console.log("Server listening on port 5000!");
  });
});
