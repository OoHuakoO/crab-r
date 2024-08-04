import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamsList = {
    PrivateStack: undefined;
    PublicStack: undefined;
};

export type PublicStackParamsList = {
    Login: undefined;
    Register: undefined;
};

export type HomeStackParamsList = {
    Home: undefined;
    Knowledge: undefined;
    Tide: undefined;
    SaveData: undefined;
    SaveWaterBefore: undefined;
    SaveWaterAfter: undefined;
    SaveCrabHatch: undefined;
    CrabCircle: undefined;
    Ph: undefined;
    Ammonia: undefined;
    Chlorine: undefined;
    Magnesium: undefined;
    Alkaline: undefined;
};

export type HistoryStackParamsList = {
    HistorySaveData: { namePage?: string; id?: string; path?: string };
    HistoryList: { namePage?: string; id?: string; path?: string };
    WaterBeforeDetail: { namePage?: string; id?: string; path?: string };
    WaterAfterDetail: { namePage?: string; id?: string; path?: string };
    CrabHatchDetail: { namePage?: string; id?: string; path?: string };
};

export type PrivateStackParamsList = {
    HomeStack: NavigatorScreenParams<HomeStackParamsList>;
    HistoryStack: NavigatorScreenParams<HistoryStackParamsList>;
    Setting: undefined;
};
