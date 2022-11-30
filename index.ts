import { startServer } from "./server";
import { config } from "dotenv";

config()

const start = () => {
    if (!process.env.SECRET) {
        throw new Error("SECRET is required")
    }

    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is required")
    }

    if (!process.env.PORT) {
        throw new Error("PORT is required")
    }

    startServer()
}

start();