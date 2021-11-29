import { IDatePickerValue, IDaysArr, IMonthData } from '@interfaces/types';
import { currDate, month } from '@utils/constants/Datepicker/Datepicker';

// Set full month with days and Date value
export const getDatePickerData = (monthData: IMonthData, daysInMonth: number): IDaysArr[] =>
    Array.from({ length: daysInMonth - 1 }, (_, i) => ({
        key: i + 1,
        value: new Date(monthData.year, monthData.month - 1, i + 1)
    }));
// This for set empty object if month does not start on Monday
export const formatedDatePickerData = (monthData: IMonthData, daysInMonth: number): IDaysArr[] =>
    Array.from(
        { length: Number(getDatePickerData(monthData, daysInMonth)[0]?.value.getDay()) - 1 },
        (): IDaysArr => ({
            key: '',
            value: new Date()
        })
    );
//Find month day name
export const currentDate = (monthData: IMonthData) =>
    month.find((date) => date.num === monthData.month);
// This for form field value, example - 'Nov 25.2021'
export const formateDate = (monthData: IMonthData) =>
    currentDate(monthData)?.name.slice(0, 3) + ' ' + currDate.currDay + ',' + currDate.currYear;
// Here i check match date, beginning with year and until the day,
// this need for styling current day
export const isCurrentDay = (value: Date, datePickerValue?: IDatePickerValue): boolean =>
    value === datePickerValue?.dateFrom;
//For styling range date from and date to
export const isDateRange = (value: Date, datePickerValue?: IDatePickerValue) => {
    if (datePickerValue?.dateTo) {
        return datePickerValue.dateFrom <= value && datePickerValue.dateTo >= value;
    } else {
        return;
    }
};
// For stylin days gone
export const isYesterday = (value: Date, datePickerValue?: IDatePickerValue): boolean => {
    if (datePickerValue?.dateTo) {
        return datePickerValue.dateFrom <= value || datePickerValue?.dateTo >= value;
    } else {
        return value < new Date();
    }
};
//For format input label
export const dateLabel = (monthData: IMonthData, pickedDate: any, dateTolabel?: string) => {
    let label =
        currentDate(monthData)?.name.slice(0, 3) + ' ' + pickedDate[0] + ',' + pickedDate[2];
    if (dateTolabel) {
        label = dateTolabel + ' ' + label;
    }
    return label;
};
