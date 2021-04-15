import express from "express";

const PORT = 4000;

const app = express();

app.get("/", (req, res) => res.send("hello"));

const handleListening = () => console.log(`✅http://localhost:${PORT}`);

app.listen(PORT, handleListening);
