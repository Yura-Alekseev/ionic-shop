export interface Environment {
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };
    returnSecureToken?: boolean;
    production: boolean;
    fbDbUrl: string;
}
