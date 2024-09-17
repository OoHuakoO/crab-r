export interface LoginParams {
    email: string;
    password: string;
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
