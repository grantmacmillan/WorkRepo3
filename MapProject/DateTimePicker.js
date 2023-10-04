import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const DateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const handleDateChange = useCallback((date) => {
        setSelectedDate(date);
        combineDateTime(date, selectedTime);
    }, [selectedTime]);

    const handleTimeChange = useCallback((time) => {
        setSelectedTime(time);
        combineDateTime(selectedDate, time);
    }, [selectedDate]);

    const combineDateTime = (date, time) => {
        const combinedDateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(),
            time.getSeconds(),
            time.getMilliseconds()
        );
        setSelectedDateTime(combinedDateTime);
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <DatePicker selectedDate={selectedDate} setSelectedDate={handleDateChange} />
            <TimePicker selectedTime={selectedTime} setSelectedTime={handleTimeChange} />
            <Text>{selectedDateTime.toString()}</Text>
        </View>
    );
};

export default DateTimePicker;



