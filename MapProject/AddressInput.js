import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressInput = () => {
    const [location, setLocation] = useState('');

    const handlePress = () => {
        console.log('Location selected:', location);
    };

    return (
        <View>
            <View style={{ flex: 1, paddingVertical: 60 }}>
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
            <View style={{ zIndex: 999 }}>
                <Button title="Submit" onPress={handlePress} />
                {location ? <Text>Selected Location: {location}</Text> : null}
                <Text>Address Input</Text>
            </View>
        </View>

    );
};

export default AddressInput;