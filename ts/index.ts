import StorageManager from "@worldbrain/storex"
import { SequelizeStorageBackend } from '@worldbrain/storex-backend-sequelize'
import { SharedSyncLogStorage } from "@worldbrain/storex-sync/lib/shared-sync-log/storex";
import { Storage } from "./storage"

export class Application {
    storage : Storage

    constructor(config : {dbPath : string}) {
        const backend = new SequelizeStorageBackend({ sequelizeConfig: config.dbPath })
        const manager = new StorageManager({backend})
        this.storage = {
            manager,
            modules: {
                sharedSyncLog: new SharedSyncLogStorage({ storageManager: manager })
            }
        }
    }
}
