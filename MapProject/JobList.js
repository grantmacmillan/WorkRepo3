import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, Platform, Pressable } from 'react-native';

const JobList = (props) => {
    const jobs = props.jobs;

    const handleDirectionsPressed = (address) => {
        // Add address to Google maps URL
        const mapsURL = `https://www.google.com/maps/dir/?api=1&origin=my+location&destination=${encodeURIComponent(address)}`;

        Linking.canOpenURL(mapsURL)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(mapsURL); // Open google maps with the URL made using the job address
                } else {
                    Alert.alert(`Don't know how to open this URL: ${mapsURL}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Jobs</Text>
            {jobs.map((job) => (
                <View key={job.id} style={styles.jobItem}>
                    <View style={styles.jobContent}>
                        <View style={styles.jobDetails}>
                            <Text>{job.address}</Text>
                        </View>
                        <Pressable style={styles.button} onPress={() => { handleDirectionsPressed(job.address) }}>
                            <Text>Directions</Text>
                        </Pressable>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    jobItem: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    jobContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jobDetails: {
        flex: 1,
    },
    button: {
        padding: 10,
        backgroundColor: '#FFA500',
        borderRadius: 5,
        marginLeft: 10,
    }
});

export default JobList;