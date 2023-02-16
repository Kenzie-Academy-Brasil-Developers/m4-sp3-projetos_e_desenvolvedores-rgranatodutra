import { client } from "./client";

export const startDatabase = async (): Promise<void> => {
    await client.connect();
    console.log("Database connected");
};