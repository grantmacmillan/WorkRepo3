import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';

const JobList = (props) => {
    const jobs = props.jobs;

    const handleDirectionsPressed = (address) => {
        // Construct the Google Maps URL with the address
        const mapsURL = `https://www.google.com/maps/search/?api=1&query=${address}`;

        const supported = Linking.canOpenURL(mapsURL);

        if (supported) {
            Linking.openURL(mapsURL); //OPEN google maps with the URL made using the address
        }
        else {
            Alert.alert(`Please install google maps to open this link ${mapsURL}`);
        }


        console.log('Submitted Address:', address);
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
                        <TouchableOpacity style={styles.button} onPress={() => { handleDirectionsPressed(job.address) }}>
                            <Text>Directions</Text>
                        </TouchableOpacity>
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
    title: {
        color: '#FFA500',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        padding: 10,
        backgroundColor: '#FFA500',
        borderRadius: 5,
        marginLeft: 10,
    }
});

export default JobList;