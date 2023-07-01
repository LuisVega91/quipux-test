export interface Credentials {
    username: string,
    password: string
}

export interface SessionData {
    token: string,
    expirationDate: string
}

export class SessionDataModel {
    token: string = '';
    expirationDate: Date = new Date();

    constructor(singInResponse: Partial<SessionData>){
        this.token = singInResponse.token ?? '';
        this.expirationDate = new Date(singInResponse.expirationDate ?? '')
    }
}