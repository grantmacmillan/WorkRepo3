import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

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
    console.log(jobs);

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

export default React.memo(Map);