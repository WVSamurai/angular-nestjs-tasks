export class CreateTaskDto {
    request: {
        text: string
        completeTo: Date | null
    }
    collId: string
}
