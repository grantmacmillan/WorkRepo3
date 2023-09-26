import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressInput = () => {
    const [location, setLocation] = useState('');

    const handlePress = () => {
        console.log('Location selected:', location);
    };

    return (
        <View style={{ flex: 1, padding: 60 }}>
            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                        zIndex: 2,
                    },
                    listView: {
                        position: 'absolute',
                        top: 50,
                    }
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
            <Button title="Submit" onPress={handlePress} />
            {location ? <Text>Selected Location: {location}</Text> : null}
        </View>
    );
};

export default AddressInput;