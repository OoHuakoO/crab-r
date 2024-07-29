import { CreateCrabHatchParams } from '@src/typings/saveData';
import { Response, post } from '@src/utils/axios';
import FormData from 'form-data';

export function CreateWaterQualityBefore(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-before/createWaterQualityBefore', params);
}

export function CreateWaterQualityAfter(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-after/createWaterQualityAfter', params);
}

export function CreateCrabHatch(
    params: CreateCrabHatchParams
): Promise<Response<any>> {
    return post<any>('/crab-hatch/createCrabHatch', params);
}
