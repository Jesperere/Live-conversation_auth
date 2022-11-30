export interface IEnv {
    MONGO_URL: string;
    PORT: string;
    SECRET: string;
}


export const environment = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET
} as IEnv