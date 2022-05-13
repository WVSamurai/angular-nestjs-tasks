import { UserInterface } from './user.interface'

export interface AuthResponseInterface {
    user: UserInterface
    accessToken: string
}
