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
