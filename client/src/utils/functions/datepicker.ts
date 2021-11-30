import { IDatePickerValue, IDaysArr } from '@interfaces/datepicker';
import { month } from '@utils/constants/Datepicker/Datepicker';

// Set full month with days and Date value
export const getDatePickedData = (monthData: Date, daysInMonth: number): IDaysArr[] =>
    Array.from({ length: daysInMonth }, (_, i) => ({
        key: i + 1,
        value: new Date(monthData.getFullYear(), monthData.getMonth(), i + 1)
    }));
// This for set empty object if month does not start on Monday
export const formatdDatePickerData = (monthData: Date, daysInMonth: number): IDaysArr[] =>
    Array.from(
        { length: Number(getDatePickedData(monthData, daysInMonth)[0]?.value.getDay()) - 1 },
        (): IDaysArr => ({
            key: '',
            value: new Date()
        })
    );
//Find month day name
export const getCurrentDate = (monthData: Date) =>
    month.find((date) => date.num === monthData.getMonth());
// This for form field value, example - 'Nov 25.2021'
export const formatDate = (monthData: Date) =>
    getCurrentDate(monthData)?.name.slice(0, 3) +
    ' ' +
    monthData.getDate() +
    ',' +
    monthData.getFullYear();
// Here i check match date, beginning with year and until the day,
// this need for styling current day
export const isCurrentDay = (value: Date): boolean =>
    value.toLocaleDateString() === new Date().toLocaleDateString();
//For styling range date from and date to
export const isDateRange = (value: Date, datePickerValue?: IDatePickerValue): boolean => {
    if (datePickerValue?.dateTo) {
        return datePickerValue.dateFrom <= value && datePickerValue.dateTo >= value;
    } else {
        return datePickerValue?.dateFrom === value;
    }
};
// For stylin days gone
export const isBefore = (value: Date, datePickerValue?: IDatePickerValue): boolean => {
    if (datePickerValue?.dateTo) {
        return datePickerValue.dateFrom <= value || datePickerValue?.dateTo >= value;
    } else {
        return value < new Date();
    }
};
//For format input label
export const createDateLabel = (value: Date, monthData: Date, dateTolabel?: string) => {
    const pickedDate = value.toLocaleDateString().split('.');

    let label =
        getCurrentDate(monthData)?.name.slice(0, 3) + ' ' + pickedDate[0] + ',' + pickedDate[2];
    if (dateTolabel) {
        label = dateTolabel + ' ' + label;
    }
    return label;
};
