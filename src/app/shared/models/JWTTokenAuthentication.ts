export class JWTTokenAuthentication {
    Username?: string
    IsAuthenticated?:boolean
    message?:string
    accessToken?: string
    isLocked?: boolean

}

export class JWTTokenResponse {
    accessToken?: string
    refreshToken?: string
    accessExpiration?: string
}


