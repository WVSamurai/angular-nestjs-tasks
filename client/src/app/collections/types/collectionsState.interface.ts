import { CollectionInterface } from './collection.interface'

export interface CollectionsStateInterface {
    isLoading: boolean
    isSubmitting: boolean
    collections: { [key: string]: CollectionInterface }
}
