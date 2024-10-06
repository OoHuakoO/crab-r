export interface LoginParams {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    location?: string;
    fcmToken: string;
    platform: string;
}

export interface LoginResponse {
    role: string;
    token: string;
}

export interface RemoveFcmTokenParams {
    fcmToken: string;
    platform: string;
}

export interface GetUserResponse {
    name: string;
    surname: string;
    location: string;
}

export interface ForgetPasswordParams {
    email: string;
}

export interface ChangePasswordParams {
    token: string;
    password: string;
    confirmPassword?: string;
}
