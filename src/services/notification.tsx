import {
    CreateFcmTokenParams,
    GetHistoriesParams,
    GetHistoriesResponse
} from '@src/typings/notification';
import { Response, get, post } from '@src/utils/axios';

export function GetHistories(
    params: GetHistoriesParams
): Promise<Response<GetHistoriesResponse[]>> {
    return get<GetHistoriesResponse[]>('/notification/histories', { params });
}

export function GetHistoryReadCount(): Promise<Response<number>> {
    return get<number>('/notification/histories-read-count');
}

export function CreateFcmToken(
    params: CreateFcmTokenParams
): Promise<Response<string>> {
    return post<string>('/common/createFcmToken', params);
}
