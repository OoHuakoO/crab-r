export interface LoginParams {
    login: string;
    password: string;
}

export interface LoginResponse {
    role: string;
    token: string;
}
