import React, { useState } from 'react';
import { View, Button, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';

function DateTimePicker() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const handleSubmit = () => {
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        const newDateTime = new Date(year, month - 1, day, hour, minute);
        setDateTime(newDateTime.toString());
    };

    return (
        <View>
            <Button title={date || "Select Date"} onPress={() => setShowDateModal(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDateModal}
            >
                <ScrollView>
                    {months.map(month => (
                        days.map(day => (
                            <TouchableOpacity onPress={() => { setDate(`2023-${month}-${day}`); setShowDateModal(false); }}>
                                <Text>{`2023-${month}-${day}`}</Text>
                            </TouchableOpacity>
                        ))
                    ))}
                </ScrollView>
            </Modal>

            <Button title={time || "Select Time"} onPress={() => setShowTimeModal(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showTimeModal}
            >
                <ScrollView>
                    {hours.map(hour => (
                        minutes.map(minute => (
                            <TouchableOpacity onPress={() => { setTime(`${hour}:${minute}`); setShowTimeModal(false); }}>
                                <Text>{`${hour}:${minute}`}</Text>
                            </TouchableOpacity>
                        ))
                    ))}
                </ScrollView>
            </Modal>

            <Button title="Set DateTime" onPress={handleSubmit} />
            {dateTime ? <Text>Selected DateTime: {dateTime}</Text> : null}
        </View>
    );
}

export default DateTimePicker;



