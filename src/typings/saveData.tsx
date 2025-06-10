export interface SaveWaterBefore {
    salinity: string;
    ph: string;
    alkaline: string;
    location?: string;
}

export interface SaveWaterAfter {
    chlorine: string;
    ammonia: string;
    calcium: string;
    magnesium: string;
    location?: string;
}

export interface SaveCrabHatch {
    location: string;
    pool: string;
    crabEggColor: string;
    crabEggScoopDate: string;
    crabReleaseDate: Date;
    countCrab: string;
}

export interface CreateUpdateCrabHatchParams {
    id?: string;
    location: string;
    pool: string;
    crabEggColor: string;
    crabEggScoopDate: Date;
    crabReleaseDate: Date;
    countCrab: number;
    countCrabString?: string;
}

export interface GetWaterQualityBeforeInquiryParams {
    page: number;
    limit: number;
}

export interface GetWaterQualityBeforeInquiryResponse {
    _id: string;
    createdAt: string;
    location: string;
}

export interface GetWaterQualityAfterInquiryParams {
    page: number;
    limit: number;
}

export interface GetWaterQualityAfterInquiryResponse {
    _id: string;
    createdAt: string;
    location: string;
}

export interface GetCrabHatchInquiryParams {
    page: number;
    limit: number;
}
export interface GetCrabHatchInquiryResponse {
    _id: string;
    createdAt: string;
    location: string;
    crabReleaseDate: string;
    pool: string;
}

export interface GetWaterQualityBeforeByIdResponse {
    location: string;
    salinity: string;
    ph: string;
    alkaline: string;
    salinityImg: string;
    phImg: string;
    alkalineImg: string;
}

export interface GetWaterQualityAfterByIdResponse {
    location: string;
    chlorine: string;
    ammonia: string;
    calcium: string;
    magnesium: string;
    chlorineImg: string;
    ammoniaImg: string;
    calciumImg: string;
    magnesiumImg: string;
}

export interface GetCrabHatchByIdResponse {
    location: string;
    pool: string;
    crabEggColor: string;
    crabEggScoopDate: Date;
    crabReleaseDate: Date;
    countCrab: string;
}

export interface HistoryList {
    _id: string;
    createdAt: string;
    crabEggScoopDate: string;
    crabReleaseDate: string;
    location: string;
    pool: string;
    image?: string;
    path?: string;
}

export interface ListPopupData {
    primary: string;
    secondary: string;
}
