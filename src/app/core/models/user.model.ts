import { AuthToken, AuthTokenModel } from "./AuthToken.model";

export type SingInRequestType = {
    username: string,
    password: string
}

export type SingUpRequestType = {
    email: string,
    password: string,
    photo: string,
    first_name: string,
    last_name: string
}

export type SingUpResponseType = {
    id: 0,
    email: string,
    auth: AuthToken,
    first_Name: string,
    last_Name: string
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface User extends UserCredentials {
    id: number;
    email: string;
    auth: AuthToken
    password: string;
    photo: string;
    firstName: string;
    lastName: string;
}

export class UserModel implements Omit<User, 'auth'>{
    id: number;
    email: string;
    auth: AuthTokenModel;
    password: string;
    photo: string;
    firstName: string;
    lastName: string;

    constructor(user: Partial<User>) {
        this.id = user.id ?? 0;
        this.email = user.email ?? '';
        this.auth = new AuthTokenModel(user.auth ?? {})
        this.password = user.password ?? '';
        this.photo = user.photo ?? '';
        this.firstName = user.firstName ?? '';
        this.lastName = user.lastName ?? '';
    }

    toSingInRequestType(): SingInRequestType {
        return {
            username: this.email,
            password: this.password,
        }
    }

    toSingUpRequestType(): SingUpRequestType {
        return {
            email: this.email,
            password: this.password,
            photo: this.photo,
            first_name: this.firstName,
            last_name: this.lastName
        }
    }

}




