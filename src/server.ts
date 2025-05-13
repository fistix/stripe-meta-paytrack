import dotenv from "dotenv";
dotenv.config();


import express, { Request, Response } from "express";
import routes from "./routes";


const app = express();

const PORT = process.env.PORT || 4000;


app.get("/", (req: Request, res: Response) => {
  console.log("Hello World");
  res.send("Hello World");
})

app.use('/', routes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})