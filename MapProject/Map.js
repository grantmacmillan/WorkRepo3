import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';


import axios from 'axios';

const containerStyle = {
    width: '90vw',
    height: '90vh',
};

const center = {
    lat: 53.5582447,
    lng: 9.647645,
};

const locations = [
    { name: 'London, England', lat: 51.5074, lng: -0.1278, color: 'blue' },
    { name: 'Toronto, Canada', lat: 43.651070, lng: -79.347015, color: 'green' },
    { name: 'New York, USA', lat: 40.7128, lng: -74.0060, color: 'red' },
];

const Map = ({ jobs }) => {

    const [coords, setCoords] = useState([]);
    const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const GOOGLE_API_KEY = 'AIzaSyDvs - pYzrss81ukHq49 - um25r1ZOXK - mHo'; // GRANTS API KEY - DO NOT SHARE
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
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
        >
            {locations.map((location, idx) => (
                <Marker
                    key={idx}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name}
                    icon={{
                        url: `http://maps.google.com/mapfiles/ms/icons/${location.color}-dot.png`
                    }}
                />
            ))}
        </GoogleMap>
    );
};

export default Map;