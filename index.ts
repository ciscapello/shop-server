import dotenv from "dotenv";
import app from "./app";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";

const port = process.env.PORT;

const DB = process.env.DB!.replace("<password>", process.env.PASSWORD!);

mongoose.connect(DB).then(() => {
  console.log("Database is connected 🥳");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
