import React, { useState } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const TimePicker = ({ selectedTime, setSelectedTime }) => {
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <TextInput
                value={selectedTime}
                onChangeText={setSelectedTime}
                placeholder='Enter a time'
            />
        </View>
    );
};

export default TimePicker;