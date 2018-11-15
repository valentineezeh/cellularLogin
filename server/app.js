// bringing in dependencies
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index";

const app = express();

app.use(express.static("./client"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/", router);

const port = +process.env.PORT || 8009;
app.set("port", port);

// Turn on the server

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

export default app;
