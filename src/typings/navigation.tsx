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
};

export type HistoryStackParamsList = {
    HistorySaveData: undefined;
};

export type PrivateStackParamsList = {
    HomeStack: NavigatorScreenParams<HomeStackParamsList>;
    HistoryStack: NavigatorScreenParams<HistoryStackParamsList>;
    Setting: undefined;
};
