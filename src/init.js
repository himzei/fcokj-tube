import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅http://localhost:${PORT}`);

app.listen(PORT, handleListening);
