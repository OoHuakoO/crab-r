export interface GetHistoriesParams {
    page: number;
    limit: number;
}

export interface GetHistoriesResponse {
    _id: string;
    crabHatchId: string;
    title: string;
    message: string;
    location: string;
    pool: string;
}
