import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import JobList from './JobList';
import JobMap from './JobMap';
import { LoadScript } from '@react-google-maps/api';
import Map from './Map';
import MobileMap from './MobileMap';

const libraries = ["places"];

const App = () => {

  const [jobs, setJobs] = useState([
    { address: '2 Ironwood Cresent Stouffville Ontario', technician: 'Justin', color: 'red', id: '1' },
    { address: '44 Flint Cresent Stouffville Ontario', technician: 'Grant', color: 'green', id: '2' },
  ]);


  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <MobileMap jobs={jobs} />

      </View>
    );
  }
  else {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDvs-pYzrss81ukHq49-um25r1ZOXK-mHo"
        libraries={libraries}
      >
        <Map jobs={jobs} />
      </LoadScript>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
