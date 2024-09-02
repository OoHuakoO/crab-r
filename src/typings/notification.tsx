export interface GetHistoriesParams {
    page: number;
    limit: number;
    fcmToken: string;
}

export interface GetHistoriesResponse {
    _id: string;
    crabHatchId: string;
    title: string;
    message: string;
    location: string;
    pool: string;
}

export interface GetHistoryReadCountParams {
    fcmToken: string;
}
