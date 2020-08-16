export interface LoginResponsePayload{
    authenticationToken : string;
    expiresAt : Date;
    refreshToken : string;
    userName : string;
}