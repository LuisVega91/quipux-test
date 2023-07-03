export interface AuthToken {
    token: string,
    expirationDate: string
}

export class AuthTokenModel {
    token: string = '';
    expirationDate: Date = new Date();

    constructor(singInResponse: Partial<AuthToken>) {
        this.token = singInResponse.token ?? '';
        this.expirationDate = new Date(singInResponse.expirationDate ?? '')
    }
}