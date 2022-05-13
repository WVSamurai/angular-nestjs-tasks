import { AuthStateInterface } from './../../auth/types/authState.interface'
import { CollectionsStateInterface } from './../../collections/types/collectionsState.interface'

export interface AppStateInterface {
    auth: AuthStateInterface
    collections: CollectionsStateInterface
}
