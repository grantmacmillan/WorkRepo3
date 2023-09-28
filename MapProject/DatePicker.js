import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

const DatePicker = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    //Set to current month and year and day by default. On the month button press they are changed lower down in the code. 
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const handleDateClick = (day) => {
        const clickedDate = new Date(selectedYear, selectedMonthIndex, day);
        console.log(clickedDate);
        setSelectedDate(clickedDate);
    };


    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex, 1).getDay();
    const daysInCurrentMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonthIndex, 0).getDate();

    const generateDaysData = (firstDayOfMonth, daysInPrevMonth, daysInCurrentMonth) => {
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
        return daysData;
    };

    const renderDay = (day, isInCurrentMonth) => (
        <Pressable
            onPress={() => isInCurrentMonth && handleDateClick(day)}
            style={[styles.renderDay, {
                opacity: isInCurrentMonth ? 1 : 0.5,
                backgroundColor: selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === selectedMonthIndex ? 'lightgreen' : 'transparent'
            }]}
        >
            {day ? <Text>{day}</Text> : null}
        </Pressable>
    );

    const renderDayHeader = (day, key) => (
        <View key={key} style={styles.renderDayHeader}>
            <Text style={{ fontWeight: 'bold' }}>{day}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Text>Date Picker</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={prevMonth} style={{ padding: 10 }}>
                    <Text>&lt;</Text>
                </Pressable>

                <Text style={{ padding: 10, fontWeight: 'bold' }}>
                    {`${monthNames[selectedMonthIndex]} ${selectedYear}`}
                </Text>

                <Pressable onPress={nextMonth} style={{ padding: 10 }}>
                    <Text>&gt;</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row' }}>
                {daysOfTheWeek.map((day, index) => renderDayHeader(day, index.toString()))}
            </View>

            <FlatList
                data={generateDaysData(firstDayOfMonth, daysInPrevMonth, daysInCurrentMonth)}
                renderItem={({ item }) => renderDay(item.day, item.isInCurrentMonth)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={7}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    renderDay: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center', // Ensure content is centered
        height: '100%', // Ensure it takes the full height available
    },
    renderDayHeader: {
        flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0'
    }
});

export default DatePicker;
