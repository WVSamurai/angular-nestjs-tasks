import { UserInterface } from './../../shared/types/user.interface'

export interface AuthStateInterface {
    isSubmitting: boolean
    isLoading: boolean
    isLoggedIn: boolean
    user: UserInterface | null
    registerErrors: string | null
    loginErrors: string | null
}
