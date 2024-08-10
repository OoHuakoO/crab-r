export interface GetHistoriesParams {
    page: number;
    limit: number;
}

export interface GetHistoriesResponse {
    _id: string;
    title: string;
    message: string;
}
