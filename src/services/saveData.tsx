import {
    CreateUpdateCrabHatchParams,
    GetCrabHatchByIdResponse,
    GetCrabHatchInquiryParams,
    GetCrabHatchInquiryResponse,
    GetWaterQualityAfterByIdResponse,
    GetWaterQualityAfterInquiryParams,
    GetWaterQualityAfterInquiryResponse,
    GetWaterQualityBeforeByIdResponse,
    GetWaterQualityBeforeInquiryParams,
    GetWaterQualityBeforeInquiryResponse
} from '@src/typings/saveData';
import { Response, get, post } from '@src/utils/axios';
import FormData from 'form-data';

export function CreateWaterQualityBefore(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-before/createWaterQualityBefore', params);
}

export function UpdateWaterQualityBefore(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-before/updateWaterQualityBefore', params);
}

export function CreateWaterQualityAfter(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-after/createWaterQualityAfter', params);
}

export function UpdateWaterQualityAfter(
    params: FormData
): Promise<Response<any>> {
    return post<any>('/water-quality-after/updateWaterQualityAfter', params);
}

export function CreateCrabHatch(
    params: CreateUpdateCrabHatchParams
): Promise<Response<any>> {
    return post<any>('/crab-hatch/createCrabHatch', params);
}

export function UpdateCrabHatch(
    params: CreateUpdateCrabHatchParams
): Promise<Response<any>> {
    return post<any>('/crab-hatch/updateCrabHatch', params);
}

export function GetWaterQualityBeforeInquiry(
    params: GetWaterQualityBeforeInquiryParams
): Promise<Response<GetWaterQualityBeforeInquiryResponse[]>> {
    return get<GetWaterQualityBeforeInquiryResponse[]>(
        '/water-quality-before/getWaterQualityBefore',
        { params }
    );
}

export function GetAdminWaterQualityBeforeInquiry(
    params: GetWaterQualityBeforeInquiryParams
): Promise<Response<GetWaterQualityBeforeInquiryResponse[]>> {
    return get<GetWaterQualityBeforeInquiryResponse[]>(
        '/water-quality-before/adminGetWaterQualityBefore',
        { params }
    );
}

export function GetWaterQualityAfterInquiry(
    params: GetWaterQualityAfterInquiryParams
): Promise<Response<GetWaterQualityAfterInquiryResponse[]>> {
    return get<GetWaterQualityAfterInquiryResponse[]>(
        '/water-quality-after/getWaterQualityAfter',
        { params }
    );
}

export function GetAdminWaterQualityAfterInquiry(
    params: GetWaterQualityAfterInquiryParams
): Promise<Response<GetWaterQualityAfterInquiryResponse[]>> {
    return get<GetWaterQualityAfterInquiryResponse[]>(
        '/water-quality-after/adminGetWaterQualityAfter',
        { params }
    );
}

export function GetCrabHatchInquiry(
    params: GetCrabHatchInquiryParams
): Promise<Response<GetCrabHatchInquiryResponse[]>> {
    return get<GetCrabHatchInquiryResponse[]>('/crab-hatch/crabHatchAll', {
        params
    });
}

export function GetAdminCrabHatchInquiry(
    params: GetCrabHatchInquiryParams
): Promise<Response<GetCrabHatchInquiryResponse[]>> {
    return get<GetCrabHatchInquiryResponse[]>('/crab-hatch/adminCrabHatchAll', {
        params
    });
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
