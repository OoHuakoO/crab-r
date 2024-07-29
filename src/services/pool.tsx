import { LocationResponse } from '@src/typings/location';
import { Response, get } from '@src/utils/axios';

export function GetPools(): Promise<Response<LocationResponse[]>> {
    return get<LocationResponse[]>('/common/pool');
}
