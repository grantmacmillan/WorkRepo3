import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Dimensions, Pressable } from 'react-native';

const TimePicker = forwardRef(({ selectedTime: externalSelectedTime, setSelectedTime: externalSetSelectedTime }, ref) => {

    // HAVE STATES FOR BOTH INTERNAL AND EXTERNAL SELECTED DATE, WORKS FOR THE FORWARD REF
    const [internalSelectedTime, setInternalSelectedTime] = useState(new Date());

    const selectedTime = externalSelectedTime ?? internalSelectedTime;
    const setSelectedTime = externalSetSelectedTime ?? setInternalSelectedTime;

    const getInitialTime = () => {
        return { hour: '12', minute: '00', period: 'AM' };
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState(getInitialTime);


    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const periods = ['AM', 'PM'];

    useImperativeHandle(ref, () => ({
        // You can expose any function here. For example:
        getSelectedTime: () => {
            return selectedTime;
        },
    }));

    //used for when user presses on the select button
    const handleTimeSelect = () => {
        // Constructing a Date
        const hour24Format = parseInt(time.hour) % 12 + (time.period === 'PM' ? 12 : 0);
        const newDate = new Date();
        newDate.setHours(hour24Format, parseInt(time.minute), 0, 0);
        setSelectedTime(newDate);
        setModalVisible(false);
    };

    const renderTimeOptions = (data, type) => {
        return data.map((value, index) => (
            <Pressable
                key={index}
                onPress={() => handleSelect(value, type)}
                style={({ pressed }) => [
                    { padding: 10, alignItems: 'center' },
                    // Highlight in green if the time is selected
                    time[type] === value && { backgroundColor: '#8ECDDD' },

                    pressed && { backgroundColor: 'lightgrey' }
                ]}
            >
                <Text style={{ fontSize: 18 }}>{value}</Text>
            </Pressable>
        ));
    };

    //used for when user presses on a time option (hours, minutes, period)
    const handleSelect = (value, type) => {
        setTime(prev => ({ ...prev, [type]: value }));
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20, zIndex: 1000 }}>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={{ backgroundColor: '#22668D', padding: 15, borderRadius: 5 }}
            >
                <Text style={{ color: '#FFFADD', fontSize: 16 }}>
                    {
                        selectedTime ?
                            `${time.hour}:${time.minute} ${time.period}` :
                            'Select Time'
                    }
                </Text>
            </Pressable>

            {modalVisible && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#FFFADD',
                    paddingTop: 10,
                    paddingBottom: 10,

                }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            width: '80%',
                            maxHeight: '80%',

                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 5, width: '100%' }}>
                            <View style={{ width: '33.3%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Hours</Text>
                            </View>
                            <View style={{ width: '33.3%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Minutes</Text>
                            </View>
                            <View style={{ width: '33.3%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Period</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: 150 }}>
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
                        style={{ marginTop: 20, backgroundColor: '#22668D', padding: 15, borderRadius: 5 }}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Select</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
});

export default TimePicker;