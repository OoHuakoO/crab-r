import { atom, RecoilState } from 'recoil';

export const notificationState: RecoilState<number> = atom({
    key: 'notificationReadCount',
    default: 0
});
