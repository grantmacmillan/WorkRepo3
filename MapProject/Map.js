import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

// takes up 80% of screen width and height
const containerStyle = {
    width: '80vw',
    height: '80vh',
};

//center map over markham ontario
const center = {
    lat: 43.856098,
    lng: -79.337021,
};

const Map = ({ jobs }) => {

    const [coords, setCoords] = useState([]);
    const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const GOOGLE_API_KEY = 'AIzaSyDvs-pYzrss81ukHq49-um25r1ZOXK-mHo'; // GRANTS API KEY - DO NOT SHARE
    console.log(jobs);

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
        <View style={styles.container}>
            <Text style={styles.header}>Job Map</Text>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
            >
                {coords.map((coord) => (
                    <Marker
                        key={coord.id}
                        position={{ lat: coord.lat, lng: coord.lng }}
                        title={jobs.find(job => job.id === coord.id)?.address}
                        icon={{
                            url: `http://maps.google.com/mapfiles/ms/icons/${jobs.find(job => job.id === coord.id)?.color}-dot.png`
                        }}
                    />
                ))}
            </GoogleMap>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default React.memo(Map);