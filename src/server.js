import "./db";
import express from "express";
import morgan from "morgan";
import boardRouter from "./routers/boardRouter";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/boards", boardRouter);

const handleListening = () => console.log(`✅http://localhost:${PORT}`);

app.listen(PORT, handleListening);
