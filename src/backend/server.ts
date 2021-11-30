import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { client } from "./db";

dotenv.config();

const app = express();

client.connect().then(() => {
  console.log("Connected to myfirstdb!");
  app.use(express.json());
  app.use(cors());

  app.get("/", async (req, res) => {
    const allData = await client.query("SELECT * FROM people;");
    // console.table(allData.rows);
    res.status(200).json({
      status: "success",
      data: {
        allData,
      },
    });
  });

  app.get("/:person_id", async (req, res) => {
    const person_id = parseInt(req.params.person_id);
    const { rows } = await client.query("SELECT * FROM people WHERE id = $1;", [
      person_id,
    ]);
    console.table(rows);
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
