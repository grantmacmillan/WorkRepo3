import React, { useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Dimensions, Pressable } from 'react-native';

const TimePicker = ({ selectedTime, setSelectedTime }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState({ hour: '00', minute: '00', period: 'AM' });


    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const periods = ['AM', 'PM'];

    const handleTimeSelect = () => {
        setSelectedTime(`${time.hour}:${time.minute} ${time.period}`);
        setModalVisible(false);
    };

    const renderTimeOptions = (data, type) => {
        return data.map((value, index) => (
            <Pressable
                key={index}
                onPress={() => handleSelect(value, type)}
                style={{ padding: 10, alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18 }}>{value}</Text>
            </Pressable>
        ));
    };

    const handleSelect = (value, type) => {
        setTime(prev => ({ ...prev, [type]: value }));
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={{ backgroundColor: 'red', padding: 15, borderRadius: 5 }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>
                    {selectedTime || 'Select Time'}
                </Text>
            </Pressable>

            {modalVisible && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        width: '80%',
                        height: 220
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 5 }}>
                            <Text style={{ fontSize: 16 }}>Hours</Text>
                            <Text style={{ fontSize: 16 }}>Minutes</Text>
                            <Text style={{ fontSize: 16 }}>Peroid</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 180 }}>
                            <ScrollView style={{ width: '33.3%' }} showsVerticalScrollIndicator={false}>
                                <View style={{ alignItems: 'center' }}>
                                    {renderTimeOptions(hours, 'hour')}
                                </View>
                            </ScrollView>
                            <ScrollView style={{ width: '33.3%' }} showsVerticalScrollIndicator={false}>
                                <View style={{ alignItems: 'center' }}>
                                    {renderTimeOptions(minutes, 'minute')}
                                </View>
                            </ScrollView>
                            <ScrollView style={{ width: '33.3%' }} showsVerticalScrollIndicator={false}>
                                <View style={{ alignItems: 'center' }}>
                                    {renderTimeOptions(periods, 'period')}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <Pressable
                        onPress={handleTimeSelect}
                        style={{ marginTop: 20, backgroundColor: 'green', padding: 15, borderRadius: 5 }}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Select</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setModalVisible(false)}
                        style={{ marginTop: 10, backgroundColor: 'red', padding: 15, borderRadius: 5 }}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default TimePicker;