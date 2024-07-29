import { Response, post } from '@src/utils/axios';
import FormData from 'form-data';

export function CreateWaterQualityBefore(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-before/createWaterQualityBefore', params);
}
