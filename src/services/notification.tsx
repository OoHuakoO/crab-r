import {
    GetHistoriesParams,
    GetHistoriesResponse,
    GetHistoryReadCountParams
} from '@src/typings/notification';
import { Response, get } from '@src/utils/axios';

export function GetHistories(
    params: GetHistoriesParams
): Promise<Response<GetHistoriesResponse[]>> {
    return get<GetHistoriesResponse[]>('/notification/histories', { params });
}

export function GetHistoryReadCount(
    params: GetHistoryReadCountParams
): Promise<Response<number>> {
    return get<number>('/notification/histories-read-count', { params });
}
