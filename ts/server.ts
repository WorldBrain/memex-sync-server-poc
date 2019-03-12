import { ApolloServer } from 'apollo-server'
import { createStorexGraphQLSchema } from '@worldbrain/storex-graphql-schema/lib/modules'
import { StorageModule } from '@worldbrain/storex-pattern-modules';
import { Application } from ".";

export function createServer(application : Application, reporter : (message : string, args : {[key : string] : any}) => void) : {start : () => Promise<void>} {
    return { start: async () => {
        const schema = createStorexGraphQLSchema({
            storageManager: application.storage.manager,
            modules: application.storage.modules as any,
            autoPkType: 'int',
        })
        const server = new ApolloServer({ schema })
        await server.listen(({ url }) => { reporter('Server is running on %s', {url}) })
    } }
}
