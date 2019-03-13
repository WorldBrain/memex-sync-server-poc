import { createServer } from "./server";
import { Application } from ".";

export async function main() {
    const application = new Application({dbPath: 'sqlite://'})
    await application.setup()
    await application.storage.manager.backend.migrate()
    const server = createServer(application, {
        printSchema: process.env.GRAPHQL_PRINT_SCHEMA === 'true',
        reporter: (msg, args) => {
            console.log(msg, ...Object.values(args || {}))
        }
    })
    await server.start()
}

if(require.main === module) {
    main()
}
