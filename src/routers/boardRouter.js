import express from "express";

const boardRouter = express.Router();

const handleViewBoard = (req, res) => res.send("View Board");

boardRouter.get("/view", handleViewBoard);

export default boardRouter;
