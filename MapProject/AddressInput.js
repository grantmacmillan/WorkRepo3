import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressInput = () => {
    const [location, setLocation] = useState('');

    const handlePress = () => {
        console.log('Location selected:', location);
    };

    return (
        <View style={{ paddingVertical: 60 }}>
            <View style={{ zIndex: 999, width: '80%', alignSelf: 'center' }}>
                <Text>Address</Text>
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
                    placeholder='Enter Location'
                    onPress={(data, details = null) => {
                        console.log(data, details);
                        setLocation(data.description);
                    }}
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
                <Text>City</Text>
                <TextInput style={styles.textInput}></TextInput>
                <Text>Province</Text>
                <TextInput style={styles.textInput}></TextInput>
                <Text>Postal Code</Text>
                <TextInput style={styles.textInput}></TextInput>
                <Text>Country</Text>
                <TextInput style={styles.textInput}></TextInput>
                <Button title="Submit" onPress={handlePress} />
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