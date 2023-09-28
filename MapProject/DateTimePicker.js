import React, { useState } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from './DatePicker';

const DateTimePicker = () => {


    return (
        <View style={{ flex: 1, width: '100%' }}>
            <DatePicker />
        </View>
    );
}

export default DateTimePicker;



