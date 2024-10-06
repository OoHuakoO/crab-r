import {
    GetUserResponse,
    LoginParams,
    LoginResponse,
    RemoveFcmTokenParams
} from '@src/typings/login';
import { Response, get, post } from '@src/utils/axios';

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
): Promise<Response<string>> {
    return post<string>('/user/remove-fcm-token', params);
}

export function RemoveUser(
    params: RemoveFcmTokenParams
): Promise<Response<string>> {
    return post<string>('/user/removeUser', params);
}

export function GetUser(): Promise<Response<GetUserResponse>> {
    return get<GetUserResponse>('/user');
}
