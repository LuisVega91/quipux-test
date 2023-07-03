export interface AuthToken {
    token: string,
    expirationDate: string
}

export class AuthTokenModel {
    token: string;
    expirationDate: Date;

    get isTokenExpiated(): boolean {
        const today = new Date();
        return today > this.expirationDate;
    }

    get hasToken(): boolean {
        return !!this.token;
    }

    constructor(singInResponse: Partial<AuthToken>) {
        this.token = singInResponse.token ?? '';
        this.expirationDate = new Date(singInResponse.expirationDate ?? '')
    }
}