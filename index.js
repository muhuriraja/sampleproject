const express = require("express");
const indexRouter = require("./auth/routers/authRouter");
const { accountRouter } = require("./auth/routers/accountRouter");
const dbConnect = require("./dbConnection");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
let app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/api", indexRouter);
app.use("/account", accountRouter);

app.get("/", (req, res) => {
  res.status(200).send("look server is all good");
});
dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`app listen port ${process.env.PORT}`);
});
