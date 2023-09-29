import React, { useState } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from './DatePicker';

const DateTimePicker = () => {


    return (
        <View style={{ flex: 1, width: '100%' }}>
            <DatePicker />
            <Text style={{ flex: 1 }}>Time Picker</Text>
        </View>
    );
}

export default DateTimePicker;



