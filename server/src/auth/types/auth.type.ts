import { ShortUserInfoType } from './shortUserInfo.type'

export type AuthType = {
    user: ShortUserInfoType
    accessToken: string
    refreshToken: string
}
