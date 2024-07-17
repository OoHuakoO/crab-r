export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    role: string;
    token: string;
}
