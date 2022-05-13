import { TaskInterface } from "src/app/shared/types/task.interface"

export interface CollectionInterface {
    _id: string
    hex: string
    name: string
    isSubmitting: boolean
    tasks: { [key: string]: TaskInterface }
}
