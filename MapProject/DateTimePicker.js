import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const DateTimePicker = () => {
    // date and time as the current date and time
    const now = new Date();

    // date object representing midnight of the current day
    const midnightToday = new Date(now);
    midnightToday.setHours(0, 0, 0, 0);

    // Initialize state
    const [selectedDate, setSelectedDate] = useState(midnightToday);
    const [selectedTime, setSelectedTime] = useState(midnightToday);
    const [selectedDateTime, setSelectedDateTime] = useState(midnightToday);

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

    //Use this function to save to Database
    const saveDateTime = () => {
        console.log(selectedDateTime);
    };

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <DatePicker selectedDate={selectedDate} setSelectedDate={handleDateChange} />
            <TimePicker selectedTime={selectedTime} setSelectedTime={handleTimeChange} />
            <Pressable
                onPress={saveDateTime}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 5
                }}
            >
                <Text style={{ color: 'white' }}>Save Date and Time</Text>
            </Pressable>
        </View>
    );
};

export default DateTimePicker;



