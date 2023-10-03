import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Pressable } from 'react-native';

const TimePicker = ({ selectedTime, setSelectedTime }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [choosingHours, setChoosingHours] = useState(true);

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const selectTime = (value) => {
        let [hour, minute] = selectedTime.split(':');
        if (choosingHours) {
            hour = value;
        } else {
            minute = value;
        }
        setSelectedTime(`${hour}:${minute}`);
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={() => selectTime(item)} style={{ padding: 16 }}>
            <Text style={{ fontSize: 24 }}>{item}</Text>
        </Pressable>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable style={{ backgroundColor: 'red', padding: 16 }} onPress={() => { setChoosingHours(true); setModalVisible(true); }}>
                <Text style={{ fontSize: 18, color: 'white' }}>{selectedTime || "Select Time"}</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '80%', height: '40%', backgroundColor: 'white', borderRadius: 8 }}>
                        <Pressable onPress={() => { setChoosingHours(!choosingHours); }} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                            <Text style={{ fontSize: 18 }}>Select {choosingHours ? 'Hour' : 'Minute'}</Text>
                        </Pressable>
                        <FlatList
                            data={choosingHours ? hours : minutes}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                            numColumns={3} // Define how many columns you want to display per row
                            contentContainerStyle={{ alignItems: 'center', padding: 16 }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TimePicker;