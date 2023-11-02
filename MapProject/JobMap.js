import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import axios from 'axios';

const JobMap = ({ jobs }) => {
    const [coords, setCoords] = useState([]);
    const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const GOOGLE_API_KEY = 'YOUR_API_KEY'; // GRANTS API KEY - DO NOT SHARE

    useEffect(() => {
        async function fetchCoordsForJobs() {
            const newCoords = []; // Array of objects with id, lat, lng of each job.

            // Loop through each job and fetch coordinates. store coords in newCoords array.
            for (let job of jobs) {
                try {
                    //Request to google API using address and API key as params.
                    const response = await axios.get(GEOCODING_API_URL, {
                        params: {
                            address: job.address,
                            key: GOOGLE_API_KEY
                        }
                    });

                    // If the response is OK, store the coordinates in the newCoords array. (==='OK' means the address was found)
                    if (response.data.status === 'OK') {
                        const location = response.data.results[0].geometry.location;
                        //add object with id, lat, lng to newCoords array.
                        newCoords.push({
                            id: job.id,
                            lat: location.lat,
                            lng: location.lng
                        });
                    }
                    //else no address was found. Log the error. 
                    else {
                        console.error('Error fetching coordinates:', response.data.status);
                    }

                } catch (error) {
                    console.error('Error:', error);
                }
            }
            // Set the coords state to the newCoords array.
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