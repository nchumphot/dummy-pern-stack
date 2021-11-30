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

  app.get("/", async (req, res) => {
    const { rows } = await client.query("SELECT * FROM todo;");
    res.status(200).json({
      status: "success",
      data: {
        rows,
      },
    });
  });

  app.get("/:todo_id", async (req, res) => {
    const todo_id = parseInt(req.params.todo_id);
    const { rows } = await client.query("SELECT * FROM todo WHERE id = $1;", [
      todo_id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        rows,
      },
    });
  });

  app.listen(5000, () => {
    console.log("Server listening on port 5000!");
  });
});
