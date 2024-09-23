import dayjs from 'dayjs';

import 'dayjs/locale/th';

dayjs.locale('th');

export function parseDateString(timestamp: string) {
    return dayjs(timestamp).format('DD/MM/YYYY');
}

export function parseMonthDateString(timestamp: string) {
    return dayjs(timestamp).format('MM/DD/YYYY');
}

export function parseDateStringTime(timestamp: string) {
    return dayjs(timestamp).format('DD/MM/YYYY HH:mm');
}

export function parseThaiDateString(timestamp: string) {
    return dayjs(timestamp).add(543, 'year').format('DD MMMM YYYY');
}

export function getCrabReleaseDate(
    selectEggColor: string,
    crabEggScoopDate: Date,
    toDate?: boolean
) {
    let daysToAdd = 1;

    if (selectEggColor === 'ดำ (1 วัน)') {
        daysToAdd = 1;
    } else if (selectEggColor === 'เทา (2 วัน)') {
        daysToAdd = 2;
    } else if (selectEggColor === 'น้ำตาล (3 วัน)') {
        daysToAdd = 3;
    } else if (selectEggColor === 'เหลือง-ส้ม (5 วัน)') {
        daysToAdd = 5;
    }
    if (toDate) {
        return dayjs(crabEggScoopDate).add(daysToAdd, 'day').toDate();
    }
    return dayjs(crabEggScoopDate)
        .add(daysToAdd, 'day')
        .add(543, 'year')
        .format('DD MMMM YYYY');
}
