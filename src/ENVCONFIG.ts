import * as dotenv from "dotenv"
 export default class EnvironmentVariables {
    private static instance: EnvironmentVariables;
    private SERVER_SECRET: string;

    private constructor() {
        dotenv.config()
        this.SERVER_SECRET = process.env.SERVER_SECRET as string
    }

    public static sharedInstance(): EnvironmentVariables {
        if (!EnvironmentVariables.instance) {
            EnvironmentVariables.instance = new EnvironmentVariables()
        }
        return EnvironmentVariables.instance
    }

    public getServerSecret(): string {
        return this.SERVER_SECRET
    }
}