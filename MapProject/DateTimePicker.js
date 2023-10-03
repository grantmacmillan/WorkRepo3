import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const DateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState('');

    const handleDateChange = useCallback((date) => {
        setSelectedDate(date);
        setSelectedDateTime(`${date} at ${selectedTime}`);
    }, [selectedTime]);

    const handleTimeChange = useCallback((time) => {
        setSelectedTime(time);
        setSelectedDateTime(`${selectedDate} at ${time}`);
    }, [selectedDate]);


    return (
        <View style={{ flex: 1, width: '100%' }}>
            <DatePicker selectedDate={selectedDate} setSelectedDate={handleDateChange} />
            <TimePicker selectedTime={selectedTime} setSelectedTime={handleTimeChange} />
            <Text>{selectedDateTime}</Text>
        </View>
    );
}

export default DateTimePicker;



