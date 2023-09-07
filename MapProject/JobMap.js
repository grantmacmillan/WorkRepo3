import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const JobMap = ({ jobs }) => {
    const [coords, setCoords] = useState([]);
    const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const GOOGLE_API_KEY = 'AIzaSyDvs-pYzrss81ukHq49-um25r1ZOXK-mHo';

    useEffect(() => {
        async function fetchCoordsForJobs() {
            const newCoords = [];

            for (let job of jobs) {
                try {
                    const response = await axios.get(GEOCODING_API_URL, {
                        params: {
                            address: job.address,
                            key: GOOGLE_API_KEY
                        }
                    });

                    if (response.data.status === 'OK') {
                        const location = response.data.results[0].geometry.location;
                        newCoords.push({
                            id: job.id,
                            lat: location.lat,
                            lng: location.lng
                        });
                    } else {
                        console.error('Error fetching coordinates:', response.data.status);
                    }

                } catch (error) {
                    console.error('Error:', error);
                }
            }

            setCoords(newCoords);
        }

        fetchCoordsForJobs();
    }, [jobs]);

    return (
        <View style={{ padding: 20 }}>
            {coords.map(coord => (
                <View key={coord.id} style={{ marginBottom: 20 }}>
                    <Text>Job ID: {coord.id}</Text>
                    <Text>Technician: {jobs.find(job => job.id === coord.id)?.technician}</Text>
                    <Text>Address: {jobs.find(job => job.id === coord.id)?.address}</Text>
                    <Text>Latitude: {coord.lat}</Text>
                    <Text>Longitude: {coord.lng}</Text>
                </View>
            ))}
        </View>
    );
}

export default JobMap;