import { createServer } from "./server";
import { Application } from ".";

export async function main() {
    const application = new Application({dbPath: 'sqlite://'})
    const server = createServer(application, (msg, args) => {
        console.log(msg, ...Object.values(args))
    })
    await server.start()
}

if(require.main === module) {
    main()
}
