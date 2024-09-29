import * as dotenv from "dotenv"
 export default class EnvironmentVariables {
    private static instance: EnvironmentVariables = new EnvironmentVariables();
    private SERVER_SECRET: string;

    private constructor() {
        dotenv.config()
        this.SERVER_SECRET = process.env.SERVER_SECRET as string
    }

    public static sharedInstance(): EnvironmentVariables {
        return EnvironmentVariables.instance
    }

    public getServerSecret(): string {
        return this.SERVER_SECRET
    }
}