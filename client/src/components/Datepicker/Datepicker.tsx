import { FC, useEffect, useState } from 'react';
import { currDate, weekDays } from '@utils/constants/Datepicker/Datepicker';
import { Icons } from '@utils/constants/icon';
import {
    currentDate,
    isCurrentDay,
    isDateRange,
    isYesterday,
    dateLabel,
    getDatePickerData,
    formatedDatePickerData,
    formateDate
} from '@utils/functions/datepicker';

import { IDatePickerValue, IDaysArr, IMonthData } from '@interfaces/types';

import {
    DatePickerWrapper,
    Days,
    Month,
    Year,
    MontName,
    MonthAction,
    MonthActionItem,
    Week,
    Day,
    DatePickerContainer
} from './styled/styled';
import { DatePickerForm } from './DatePickerForm';

export interface IRangeDate {
    minDate: string;
    maxDate: string;
}

export interface IDatePickerProps {
    range?: boolean;
    startOnCurrent?: boolean;
    rangeDate?: IRangeDate;
}

export const Datepicker: FC<IDatePickerProps> = ({ rangeDate }) => {
    const [monthData, setMonthData] = useState<IMonthData>({
        day: currDate.currDay,
        month: currDate.currMouth,
        year: currDate.currYear
    });
    const [daysInMonth, setDaysInMonth] = useState(
        new Date(monthData.year, monthData.month, 0).getDate() + 1
    );
    const [datePickerData, setDatePickerData] = useState<IDaysArr[]>();
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState<IDatePickerValue>({
        label: formateDate(monthData),
        dateFrom: new Date()
    });
    let formatedRangedDate: any;
    if (rangeDate) {
        formatedRangedDate = {
            minDate: new Date(
                Number(rangeDate.minDate.split('-')[2]),
                Number(rangeDate.minDate.split('-')[1]) - 1,
                Number(rangeDate.minDate.split('-')[0])
            ),
            maxDate: new Date(
                Number(rangeDate.maxDate.split('-')[2]),
                Number(rangeDate.maxDate.split('-')[1]) - 1,
                Number(rangeDate.maxDate.split('-')[0])
            )
        };
    }

    const handleChangeMonth = (month: number) => () => {
        setDaysInMonth(new Date(monthData.year, month, 0).getDate() + 1);
        setMonthData({ ...monthData, month: month });
    };
    const handleShowDadepicker = () => {
        setShowDatepicker(!showDatepicker);
    };
    const handlePickDate = (value: Date) => () => {
        const pickedDate = value.toLocaleDateString().split('.');
        const pickedDateFrom: IDatePickerValue = {
            label: dateLabel(monthData, pickedDate),
            dateFrom: value
        };
        //! Работаю над этим, рефакторю
        if (value > new Date()) {
            if (!datePickerValue?.dateFrom) {
                if (formatedRangedDate) {
                    if (formatedRangedDate.minDate <= value) {
                        setDatePickerValue(pickedDateFrom);
                    }
                    return;
                } else {
                    setDatePickerValue(pickedDateFrom);
                    return;
                }
            }
            if (value < datePickerValue?.dateFrom) {
                setDatePickerValue(pickedDateFrom);
                return;
            }
            if (!datePickerValue?.dateTo) {
                if (formatedRangedDate) {
                    if (formatedRangedDate.maxDate >= value) {
                        setDatePickerValue({
                            ...datePickerValue,
                            label: dateLabel(monthData, pickedDate, datePickerValue.label),
                            dateTo: value
                        });
                    }
                } else {
                    setDatePickerValue({
                        ...datePickerValue,
                        label: dateLabel(monthData, pickedDate, datePickerValue.label),
                        dateTo: value
                    });
                }
            } else {
                setDatePickerValue(pickedDateFrom);
            }
        }
    };
    const onChange = (value: IDatePickerValue) => {
        console.log(value);
    };
    useEffect(() => {
        getDatePickerData(monthData, daysInMonth);
        // User click to next button (month = 12 ), and year + 1
        if (monthData.month > 12) {
            setMonthData({
                ...monthData,
                year: monthData.year + 1,
                month: (monthData.month = 1)
            });
        }
        // User click to prew button (month = 1), and year -1
        if (monthData.month <= 0) {
            setMonthData({
                ...monthData,
                year: monthData.year - 1,
                month: (monthData.month = 12)
            });
        }
        setDatePickerData([
            ...formatedDatePickerData(monthData, daysInMonth),
            ...getDatePickerData(monthData, daysInMonth)
        ]);
    }, [monthData]);
    return (
        <DatePickerWrapper>
            <DatePickerForm
                label={datePickerValue?.label}
                handleShowDadepicker={handleShowDadepicker}
                onChange={onChange}
                monthData={monthData}
            />

            {showDatepicker && (
                <DatePickerContainer>
                    <Month>
                        <MontName>
                            {currentDate(monthData)?.name} <Year>{monthData.year}</Year>
                        </MontName>
                        <MonthAction>
                            <MonthActionItem onClick={handleChangeMonth(monthData.month - 1)}>
                                <Icons.ChevronLeftIcon />
                            </MonthActionItem>
                            <MonthActionItem onClick={handleChangeMonth(monthData.month + 1)}>
                                <Icons.ChevronRightIcon />
                            </MonthActionItem>
                        </MonthAction>
                    </Month>
                    <Week>
                        {weekDays.map(({ day }) => (
                            <Day key={day}>{day}</Day>
                        ))}
                    </Week>
                    <Days>
                        {datePickerData?.map(({ key, value }: IDaysArr, index) => (
                            <Day
                                onClick={handlePickDate(value)}
                                key={index}
                                pickerPosition={key}
                                datePickerValue={isDateRange(value, datePickerValue)}
                                yesrerday={isYesterday(value, datePickerValue)}
                                today={isCurrentDay(value, datePickerValue)}
                                hover={true}
                            >
                                {/* if (rangedDate) {
            return (
                rangedDate.minDate > datePickerValue.dateFrom &&
                rangedDate.minDate < datePickerValue.dateTo
            );
        } */}
                                {key}
                            </Day>
                        ))}
                    </Days>
                </DatePickerContainer>
            )}
        </DatePickerWrapper>
    );
};
