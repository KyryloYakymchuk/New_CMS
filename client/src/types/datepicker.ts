export interface IDaysArr {
    key: number | '';
    value: Date;
}

export interface IDatePickerValue {
    label: string;
    dateFrom: Date;
    dateTo?: Date;
}
export interface IMonthData {
    day: number;
    month: number;
    year: number;
}

export interface IDatePickerProps {
    range?: boolean;
    minDate?: Date;
    maxDate?: Date;
}
