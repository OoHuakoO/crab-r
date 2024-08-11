import {
    GetHistoriesParams,
    GetHistoriesResponse
} from '@src/typings/notification';
import { Response, get } from '@src/utils/axios';

export function GetHistories(
    params: GetHistoriesParams
): Promise<Response<GetHistoriesResponse[]>> {
    return get<GetHistoriesResponse[]>('/notification/histories', { params });
}

export function GetHistoryReadCount(): Promise<Response<number>> {
    return get<number>('/notification/histories-read-count');
}
