import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import axios from 'axios';

const MobileMap = ({ jobs }) => {
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
            <View style={styles.header}>
                <Text style={styles.headerText}>Job Map</Text>
            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 43.856098,
                    longitude: -79.337021,
                    latitudeDelta: 1.5922,
                    longitudeDelta: 1.5421,
                }}
            >
                {coords.map((coord) => (
                    <Marker
                        key={coord.id}
                        coordinate={{ latitude: coord.lat, longitude: coord.lng }}
                        title={jobs.find(job => job.id === coord.id)?.address}
                        description={jobs.find(job => job.id === coord.id)?.technician}
                        pinColor={jobs.find(job => job.id === coord.id)?.color}
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerText: {
        fontSize: 24,
    },
    map: {
        flex: 1,
        minWidth: '100%',
    },
});
export default MobileMap;