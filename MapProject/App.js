import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import JobList from './JobList';
import JobMap from './JobMap';

const App = () => {

  const [jobs, setJobs] = useState([
    { address: '2 Ironwood Cresent Stouffville Ontario', technician: 'Justin', id: '1' },
    { address: '44 Flint Cresent Stouffville Ontario', technician: 'Grant', id: '2' },
  ]);

  return (
    <View style={styles.container}>

      <JobMap jobs={jobs}></JobMap>
    </View>
  );
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
