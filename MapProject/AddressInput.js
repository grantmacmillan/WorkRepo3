import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';

const AddressInput = () => {
    const API_KEY = "API_KEY"; //GRANTS API KEY - DO NOT SHARE

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const [input, setInput] = useState('');
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const debounceTimeout = setTimeout(async () => {
            if (!input) return;
            try {
                let tempURL = '';
                if (Platform.OS === 'web') {
                    tempURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}&components=country:ca`;
                }
                else {
                    tempURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}&components=country:ca`;
                }

                const apiUrl = tempURL;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'OK') {
                    setPredictions(data.predictions);
                } else {
                    console.error('Error fetching places:', data.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }


        }, 100); // 100ms delay, helps alot with performance

        return () => clearTimeout(debounceTimeout); // Clear the timeout on component unmount
    }, [input]);

    useEffect(() => {
        setInput(address1);
    }, [address1]);

    const handlePress = async (placeId) => {
        console.log('Selected Place:', placeId);
        setPredictions([]); //clear predictions after a place is selected

        try {
            let tempURL = '';
            if (Platform.OS === 'web') {
                tempURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}&fields=address_component`;
            }
            else {
                tempURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}&fields=address_component`;
            }
            const placeDetailsUrl = tempURL;

            const response = await fetch(placeDetailsUrl);
            const data = await response.json();

            if (data.status === 'OK') {
                const addressComponents = data.result.address_components;
                //setting address state variables based on the address components returned from the google API
                setAddress1(addressComponents?.find(item => item.types.includes('street_number'))?.long_name + ' ' +
                    addressComponents?.find(item => item.types.includes('route'))?.long_name || '');
                setAddress2(addressComponents?.find(item => item.types.includes('sublocality_level_1'))?.long_name || '');
                setCity(addressComponents?.find(item => item.types.includes('locality'))?.long_name || '');
                setProvince(addressComponents?.find(item => item.types.includes('administrative_area_level_1'))?.long_name || '');
                setPostalCode(addressComponents?.find(item => item.types.includes('postal_code'))?.long_name || '');
                setCountry(addressComponents?.find(item => item.types.includes('country'))?.long_name || '');
            } else {
                console.error('Error fetching place details:', data.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = () => {
        // Clear all the address state variables
        setAddress1('');
        setAddress2('');
        setCity('');
        setProvince('');
        setPostalCode('');
        setCountry('');
    };

    const handleSave = () => {
        // SAVE ADDRESS TO DATABASE HERE
        console.log('address: ' + address1 + ' ' + address2 + ' ' + city + ' ' + province + ' ' + postalCode + ' ' + country);
    };

    return (
        <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', width: "100%", marginVertical: 50 }}
            activeOpacity={1} // to prevent any opacity change
            onPress={() => predictions.length > 0 && setPredictions([])} // clear predictions when anything outside FlatList is pressed
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Text>Address Line 1</Text>
                </View>

                <View style={{ position: 'relative', zIndex: 1000, elevation: 5 }}>
                    <TextInput
                        style={{
                            borderRadius: 8,
                            backgroundColor: '#ADD8E6',
                            fontSize: 16,
                            padding: 10,
                        }}
                        onChangeText={setInput}
                        value={input}
                        placeholder='Enter Address'
                    />

                    {predictions.length > 0 && (
                        <FlatList
                            style={{
                                position: 'absolute',
                                top: 45,
                                width: '100%',
                                zIndex: 1000,
                                elevation: 5,
                                backgroundColor: '#adbce6',
                                borderRadius: 8,
                            }}
                            data={predictions}
                            keyExtractor={(item) => item.place_id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={(e) => {
                                        e.stopPropagation(); // stop event propagation to prevent the outer TouchableOpacity from handling this press
                                        handlePress(item.place_id);
                                    }}
                                    style={{ margin: 5, padding: 10 }}
                                >
                                    <Text>{item.description}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>

                <View style={{ zIndex: 999, elevation: 0, width: '100%', alignSelf: 'center', overflow: 'visible' }}>
                    <Text>Address Line 2</Text>
                    <TextInput style={styles.textInput} value={address2} onChangeText={setAddress2} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text>City</Text>
                            <TextInput style={styles.textInput} value={city} onChangeText={setCity} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Province</Text>
                            <TextInput style={styles.textInput} value={province} onChangeText={setProvince} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text>Postal Code</Text>
                            <TextInput style={styles.textInput} value={postalCode} onChangeText={setPostalCode} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Country</Text>
                            <TextInput style={styles.textInput} value={country} onChangeText={setCountry} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Pressable
                                onPress={handleClear}
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? 'white' : 'orange',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                })}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Clear</Text>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Pressable
                                onPress={handleSave}
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? 'white' : 'blue',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                })}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008000',
    },
    textInput: {
        backgroundColor: '#ADD8E6',
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 10,
        marginVertical: 5,
        height: 44, // Adjusted height to match the autocomplete input field
        borderRadius: 8,
    },
});

export default AddressInput;