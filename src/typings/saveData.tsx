export interface SaveWaterBefore {
    salinity: string;
    ph: string;
    alkaline: string;
}

export interface SaveWaterAfter {
    ammonia: string;
    calcium: string;
    magnesium: string;
}

export interface CreateCrabHatchParams {
    location: string;
    pool: string;
    crabEggColor: string;
    crabEggScoopDate: string;
    crabReleaseDate: string;
}

export interface GetWaterQualityBeforeInquiryParams {
    page: number;
    limit: number;
}

export interface GetWaterQualityBeforeInquiryResponse {
    _id: string;
    createdAt: string;
    location: string;
    pool: string;
}

export interface GetWaterQualityAfterInquiryParams {
    page: number;
    limit: number;
}

export interface GetWaterQualityAfterInquiryResponse {
    _id: string;
    createdAt: string;
    location: string;
    pool: string;
}

export interface GetCrabHatchInquiryParams {
    page: number;
    limit: number;
}
export interface GetCrabHatchInquiryResponse {
    _id: string;
    createdAt: string;
    location: string;
    pool: string;
}

export interface GetWaterQualityBeforeByIdResponse {
    location: string;
    pool: string;
    salinity: string;
    ph: string;
    alkaline: string;
    salinityImg: string;
    phImg: string;
    alkalineImg: string;
}

export interface GetWaterQualityAfterByIdResponse {
    location: string;
    pool: string;
    ammonia: string;
    calcium: string;
    magnesium: string;
    ammoniaImg: string;
    calciumImg: string;
    magnesiumImg: string;
}

export interface GetCrabHatchByIdResponse {
    location: string;
    pool: string;
    crabEggColor: string;
    crabReleaseDate: string;
    crabEggScoopDate: string;
}

export interface HistoryList {
    _id: string;
    createdAt: string;
    location: string;
    pool: string;
    image?: string;
    path?: string;
}
