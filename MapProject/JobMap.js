import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const JobMap = (props) => {
    const [address, setAddress] = useState(''); // For the address input
    const [coords, setCoords] = useState(null); // To store and display coordinates

    const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const GOOGLE_API_KEY = 'AIzaSyDvs-pYzrss81ukHq49-um25r1ZOXK-mHo';

    const getLatLng = async () => {
        try {
            const response = await axios.get(GEOCODING_API_URL, {
                params: {
                    address: address,
                    key: GOOGLE_API_KEY
                }
            });

            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                setCoords({ lat: location.lat, lng: location.lng });
            } else {
                console.error('Error fetching coordinates:', response.data.status);
                setCoords(null);
            }

        } catch (error) {
            console.error('Error:', error);
            setCoords(null);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10
                }}
                placeholder="Enter address..."
                value={address}
                onChangeText={text => setAddress(text)}
            />
            <Button title="Get Coordinates" onPress={getLatLng} />
            {coords && (
                <View style={{ marginTop: 20 }}>
                    <Text>Latitude: {coords.lat}</Text>
                    <Text>Longitude: {coords.lng}</Text>
                </View>
            )}
        </View>
    );
}

export default JobMap;