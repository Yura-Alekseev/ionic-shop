export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface ProductItem {
    img: string;
    price: number;
    title: string;
    description: string;
    color: string;
    memory: number;
    id: string;
}
