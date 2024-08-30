import dotev from "dotenv";
import Server from "./models/server";

// Configurar dot.env
dotev.config();

const server = new Server();

server.listen()