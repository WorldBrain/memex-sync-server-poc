import * as graphql from 'graphql'
import { ApolloServer } from 'apollo-server'
import { createStorexGraphQLSchema } from '@worldbrain/storex-graphql-schema/lib/modules'
import { StorageModule } from '@worldbrain/storex-pattern-modules';
import { Application } from ".";

export function createServer(application : Application, options : {
    reporter : (message : string, args : {[key : string] : any}) => void,
    printSchema? : boolean
}) : {start : () => Promise<void>} {
    return { start: async () => {
        const schema = createStorexGraphQLSchema(application.storage.modules as any, {
            storageManager: application.storage.manager,
            autoPkType: 'int',
            graphql
        })
        if (options.printSchema) {
            console.log(graphql.printSchema(schema))
        }
        const server = new ApolloServer({ schema })
        const { url } = await server.listen()
        options.reporter('Server is running on %s', {url})
    } }
}
