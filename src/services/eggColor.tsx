import { EggColorResponse } from '@src/typings/eggColor';
import { Response, get } from '@src/utils/axios';

export function GetCrabEggColors(): Promise<Response<EggColorResponse[]>> {
    return get<EggColorResponse[]>('/crab-egg-color/crabEggColor');
}
