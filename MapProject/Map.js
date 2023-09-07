import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 53.5582447,
    lng: 9.647645,
};

const locations = [
    { name: 'London, England', lat: 51.5074, lng: -0.1278 },
    { name: 'Toronto, Canada', lat: 43.651070, lng: -79.347015 },
    { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
];

const Map = () => {
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
        >
            {locations.map((location, idx) => (
                <Marker key={idx} position={location} title={location.name} />
            ))}
        </GoogleMap>
    );
};

export default React.memo(Map);