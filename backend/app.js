import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

import blogRouter from "./routes/blog.route.js";

app.use("/api/v1/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

import petRouter from "./routes/pet.route.js";

app.use("/api/v1/pets", petRouter);

export { app };
