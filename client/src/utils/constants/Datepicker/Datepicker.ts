import i18n from '@utils/helpers/i18n';
export const month = [
    { num: 1, name: i18n.t('January') },
    { num: 2, name: i18n.t('February') },
    { num: 3, name: i18n.t('March') },
    { num: 4, name: i18n.t('April') },
    { num: 5, name: i18n.t('May') },
    { num: 6, name: i18n.t('June') },
    { num: 7, name: i18n.t('July') },
    { num: 8, name: i18n.t('August') },
    { num: 9, name: i18n.t('September') },
    { num: 10, name: i18n.t('October') },
    { num: 11, name: i18n.t('November') },
    { num: 12, name: i18n.t('December') }
];
export const weekDays = [
    { day: i18n.t('Mon') },
    { day: i18n.t('Tue') },
    { day: i18n.t('Wed') },
    { day: i18n.t('Thu') },
    { day: i18n.t('Fri') },
    { day: i18n.t('Sat') },
    { day: i18n.t('Sun') }
];

export const currDate = {
    currDay: Number(new Date().toLocaleDateString().split('.')[0]),
    currMouth: Number(new Date().toLocaleDateString().split('.')[1]),
    currYear: Number(new Date().toLocaleDateString().split('.')[2])
};
