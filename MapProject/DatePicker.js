import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';

const DatePicker = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const nextMonth = () => {
        if (selectedMonthIndex === 11) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonthIndex(0);
        } else {
            setSelectedMonthIndex(selectedMonthIndex + 1);
        }
    };

    const prevMonth = () => {
        if (selectedMonthIndex === 0) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonthIndex(11);
        } else {
            setSelectedMonthIndex(selectedMonthIndex - 1);
        }
    };

    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex, 1).getDay();
    const daysInCurrentMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonthIndex, 0).getDate();

    let daysData = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysData.push({ day: daysInPrevMonth - firstDayOfMonth + i + 1, isInCurrentMonth: false });
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        daysData.push({ day: i, isInCurrentMonth: true });
    }
    const remainder = daysData.length % 7;
    for (let i = 1; i <= 7 - remainder; i++) {
        daysData.push({ day: i, isInCurrentMonth: false });
    }

    const renderDay = (day, isInCurrentMonth) => (
        <View style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: 'grey', alignItems: 'center', opacity: isInCurrentMonth ? 1 : 0.5 }}>
            {day ? <Text>{day}</Text> : null}
        </View>
    );

    const renderDayHeader = (day) => (
        <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
            <Text style={{ fontWeight: 'bold' }}>{day}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Text>Date Picker</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={prevMonth} style={{ padding: 10 }}>
                    <Text>&lt;</Text>
                </Pressable>
                <Text style={{ padding: 10, fontWeight: 'bold' }}>{`${monthNames[selectedMonthIndex]} ${selectedYear}`}</Text>
                <Pressable onPress={nextMonth} style={{ padding: 10 }}>
                    <Text>&gt;</Text>
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {daysOfTheWeek.map((day) => renderDayHeader(day))}
            </View>
            <FlatList
                data={daysData}
                renderItem={({ item }) => renderDay(item.day, item.isInCurrentMonth)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={7}
            />
        </View>
    );
};

export default DatePicker;
