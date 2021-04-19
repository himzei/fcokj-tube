import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStroe from "connect-mongo";
import boardRouter from "./routers/boardRouter";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStroe.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/boards", boardRouter);

export default app;
