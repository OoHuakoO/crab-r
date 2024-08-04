import {
    CreateCrabHatchParams,
    GetCrabHatchByIdResponse,
    GetCrabHatchInquiryResponse,
    GetWaterQualityAfterByIdResponse,
    GetWaterQualityAfterInquiryResponse,
    GetWaterQualityBeforeByIdResponse,
    GetWaterQualityBeforeInquiryResponse
} from '@src/typings/saveData';
import { Response, get, post } from '@src/utils/axios';
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

export function GetWaterQualityBeforeInquiry(): Promise<
    Response<GetWaterQualityBeforeInquiryResponse[]>
> {
    return get<GetWaterQualityBeforeInquiryResponse[]>(
        '/water-quality-before/getWaterQualityBefore'
    );
}

export function GetWaterQualityAfterInquiry(): Promise<
    Response<GetWaterQualityAfterInquiryResponse[]>
> {
    return get<GetWaterQualityAfterInquiryResponse[]>(
        '/water-quality-after/getWaterQualityAfter'
    );
}

export function GetCrabHatchInquiry(): Promise<
    Response<GetCrabHatchInquiryResponse[]>
> {
    return get<GetCrabHatchInquiryResponse[]>('/crab-hatch/crabHatchAll');
}

export function GetWaterQualityBeforeById(
    id
): Promise<Response<GetWaterQualityBeforeByIdResponse>> {
    return get<GetWaterQualityBeforeByIdResponse>(
        `/water-quality-before/getWaterQualityBeforeById/${id}`
    );
}

export function GetWaterQualityAfterById(
    id
): Promise<Response<GetWaterQualityAfterByIdResponse>> {
    return get<GetWaterQualityAfterByIdResponse>(
        `/water-quality-after/getWaterQualityAfterById/${id}`
    );
}

export function GetCrabHatchById(
    id
): Promise<Response<GetCrabHatchByIdResponse>> {
    return get<GetCrabHatchByIdResponse>(`/crab-hatch/crabHatchById/${id}`);
}
