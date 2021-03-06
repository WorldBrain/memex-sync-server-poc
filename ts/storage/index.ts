import StorageManager from '@worldbrain/storex'
import { SharedSyncLogStorage } from '@worldbrain/storex-sync/lib/shared-sync-log/storex'

export interface Storage {
    modules : StorageModules
    manager : StorageManager
}

export interface StorageModules {
    sharedSyncLog : SharedSyncLogStorage
}
