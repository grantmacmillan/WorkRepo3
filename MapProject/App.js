import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native';

import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

const libraries = ["places"];

const App = () => {

  const [jobs, setJobs] = useState([
    { address: '2 Ironwood Cresent Stouffville Ontario', technician: 'Justin', color: 'red', id: '1' },
    { address: '44 Flint Cresent Stouffville Ontario', technician: 'Grant', color: 'green', id: '2' },
  ]);

  const timePickerRef = useRef(null);  // Create a ref

  //THIS TRIGGERS THE BUTTON TO SAVE THE TIME
  const saveDateTime = () => {
    if (timePickerRef.current != null) {
      const currentTime = timePickerRef.current.getSelectedTime();
      console.log(currentTime);
    }
    else {
      console.log('Please select a date and time');
    }
  };

  return (
    <View style={styles.container}>
      <DateTimePicker />
    </View>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    width: '100%',
  },
});

export default App;
