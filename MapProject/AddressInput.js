import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Pressable, TextInput, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressInput = () => {
    const [location, setLocation] = useState('');

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const autocompleteRef = useRef(null);

    const handlePress = (data, details = null) => {
        console.log(data, details);

        // Extract relevant address components from details and set them to state variables
        const addressComponents = details?.address_components || [];
        setAddress1(addressComponents?.find(item => item.types.includes('street_number'))?.long_name + ' ' +
            addressComponents?.find(item => item.types.includes('route'))?.long_name);
        setAddress2(addressComponents?.find(item => item.types.includes('sublocality_level_1'))?.long_name);
        setCity(addressComponents?.find(item => item.types.includes('locality'))?.long_name);
        setProvince(addressComponents?.find(item => item.types.includes('administrative_area_level_1'))?.long_name);
        setPostalCode(addressComponents?.find(item => item.types.includes('postal_code'))?.long_name);
        setCountry(addressComponents?.find(item => item.types.includes('country'))?.long_name);
    };

    useEffect(() => {
        // Watch for changes to address1 state and update input text
        if (address1) {
            autocompleteRef.current?.setAddressText(address1);
        }
    }, [address1]);

    const handleSave = () => {
        console.log('address: ' + address1 + ' ' + address2 + ' ' + city + ' ' + province + ' ' + postalCode + ' ' + country);
    };

    return (
        <View style={{ paddingVertical: 60 }}>
            <View style={{ zIndex: 999, width: '80%', alignSelf: 'center' }}>
                <Text>Address Line 1</Text>
            </View>

            <View style={{ zIndex: 1000, flex: 1, marginBottom: 60 }}>
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            elevation: 1,
                            zIndex: 1000,
                            backgroundColor: '#008000',
                            width: '80%',
                            alignSelf: 'center',
                        },
                        textInputContainer: {
                            backgroundColor: '#008000',
                            width: '100%',
                        },
                        textInput: {
                            backgroundColor: '#008000',
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        listView: {
                            position: 'absolute',
                            zIndex: 1000,
                            top: 50,
                            width: '80%',
                            alignSelf: 'center',
                            backgroundColor: '#008000', // Set background color to white or any other color
                        },
                        row: {
                            zIndex: 1000,
                            backgroundColor: '#008000', // Ensure each row is not transparent
                        },
                    }}
                    ref={autocompleteRef}
                    placeholder='Enter Location'
                    onPress={handlePress}
                    query={{
                        key: 'AIzaSyDvs-pYzrss81ukHq49-um25r1ZOXK-mHo', // Please replace with your actual API key
                        language: 'en',
                    }}
                    fetchDetails={true}
                    preProcessPredictions={(predictions) => {
                        return predictions.slice(0, 5);
                    }}


                />

            </View>
            <View style={{ zIndex: 999, width: '80%', alignSelf: 'center' }}>
                <Text>Address Line 2</Text>
                <TextInput style={styles.textInput} value={address2} onChangeText={setAddress2} />
                <Text>City</Text>
                <TextInput style={styles.textInput} value={city} onChangeText={setCity} />
                <Text>Province</Text>
                <TextInput style={styles.textInput} value={province} onChangeText={setProvince} />
                <Text>Postal Code</Text>
                <TextInput style={styles.textInput} value={postalCode} onChangeText={setPostalCode} />
                <Text>Country</Text>
                <TextInput style={styles.textInput} value={country} onChangeText={setCountry} />
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

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008000',
    },
    textInput: {
        backgroundColor: '#008000',
        color: '#5d5d5d',
        fontSize: 16,
        paddingHorizontal: 10,
        marginVertical: 5,
        elevation: 1,
        height: 44, // Adjusted height to match the autocomplete input field
        borderRadius: 8, // Added rounded corners
    },
});

export default AddressInput;