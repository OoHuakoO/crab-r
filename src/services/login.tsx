import {
    LoginParams,
    LoginResponse,
    RemoveFcmTokenParams
} from '@src/typings/login';
import { Response, post } from '@src/utils/axios';

export function Login(params: LoginParams): Promise<Response<LoginResponse>> {
    return post<LoginResponse>('/user/login', params);
}

export function Register(
    params: LoginParams
): Promise<Response<LoginResponse>> {
    return post<LoginResponse>('/user/register', params);
}

export function RemoveFcmToken(
    params: RemoveFcmTokenParams
): Promise<Response<LoginResponse>> {
    return post<any>('/user/remove-fcm-token', params);
}
