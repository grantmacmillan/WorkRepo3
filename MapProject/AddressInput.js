import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressInput = () => {

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    // Reference to the GooglePlacesAutocomplete component. Used to set the address text when the user presses the autocomplete prediction.
    const autocompleteRef = useRef(null);

    const handlePress = (data, details = null) => {
        console.log(data, details);

        // Gets the required address components from the details object. IMPORTANT: ensure the details object is not null by adding ||'' to the end of each line.
        const addressComponents = details?.address_components || [];
        setAddress1(addressComponents?.find(item => item.types.includes('street_number'))?.long_name + ' ' +
            addressComponents?.find(item => item.types.includes('route'))?.long_name || '');
        setAddress2(addressComponents?.find(item => item.types.includes('sublocality_level_1'))?.long_name || '');
        setCity(addressComponents?.find(item => item.types.includes('locality'))?.long_name || '');
        setProvince(addressComponents?.find(item => item.types.includes('administrative_area_level_1'))?.long_name || '');
        setPostalCode(addressComponents?.find(item => item.types.includes('postal_code'))?.long_name || '');
        setCountry(addressComponents?.find(item => item.types.includes('country'))?.long_name || '');
    };

    useEffect(() => {
        // this use effect statement is used for setting the address text when the user presses the autocomplete prediction.
        if (address1) {
            autocompleteRef.current?.setAddressText(address1);
        }
    }, [address1]);

    const handleClear = () => {
        // Clear all the address state variables
        setAddress1('');
        setAddress2('');
        setCity('');
        setProvince('');
        setPostalCode('');
        setCountry('');

        // Clear the text in GooglePlacesAutocomplete if needed
        if (autocompleteRef.current) {
            // Check if the library has a method to clear the input, or if there is a property you can set
            // If not directly available, consult the library documentation or look for alternative ways
            autocompleteRef.current.setAddressText('');
        }
    };

    const handleSave = () => {
        // SAVE ADDRESS TO DATABASE HERE
        console.log('address: ' + address1 + ' ' + address2 + ' ' + city + ' ' + province + ' ' + postalCode + ' ' + country);
    };

    return (
        <View style={{ alignSelf: 'center', elevation: 0, width: '100%' }}>
            <View style={{ zIndex: 999, elevation: 0, width: '100%', alignSelf: 'center' }}>
                <Text>Address Line 1</Text>
            </View>

            <View style={{ zIndex: 1000, elevation: 1, flex: 1, marginVertical: 'auto' }}>
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            elevation: 1,
                            zIndex: 1000,
                        },
                        textInputContainer: {
                            borderRadius: 8,
                        },
                        textInput: {
                            borderRadius: 8,
                            backgroundColor: '#ADD8E6',
                            fontSize: 16,
                        },
                        listView: {
                            position: 'absolute',
                            elevation: 5,
                            zIndex: 1000,
                            top: 50,
                            width: '80%',
                            alignSelf: 'left',
                            backgroundColor: '#adbce6', // Set background color to white or any other color
                            borderRadius: 8,
                        },
                        row: {
                            zIndex: 1000,
                            elevation: 5,
                            backgroundColor: '#adbce6', // Ensure each row is not transparent
                            borderRadius: 8,
                        },
                    }}
                    ref={autocompleteRef}
                    placeholder='Enter Adress'
                    onPress={handlePress}
                    query={{
                        key: 'API_KEY_HERE', // GRANTS API KEY
                        language: 'en',
                        components: 'country:ca', // Limit results to Canada
                    }}
                    //Request URL is needed for desktop web platform. Use this to bypass CORS errors.
                    requestUrl={{
                        url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // Proxy URL, found on api documentation. Use this to bypass CORS errors.
                        useOnPlatform: 'web', // Use this URL for the web platform
                    }}
                    fetchDetails={true}
                    preProcessPredictions={(predictions) => {
                        return predictions.slice(0, 5);
                    }}
                />
            </View>

            <View style={{ zIndex: 999, elevation: 0, width: '100%', alignSelf: 'center', overflow: 'visible', marginTop: Platform.OS === 'web' ? 0 : 50 }}>
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