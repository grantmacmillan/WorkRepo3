import React, { useState, useEffect } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const DateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
    }, [selectedDate, selectedTime]);

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimePicker selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            <Text>{`${selectedDate} at ${selectedTime}`}</Text>
        </View>
    );
}

export default DateTimePicker;



