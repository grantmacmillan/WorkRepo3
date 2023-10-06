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


  const datePickerRef = useRef(null);  // Create a ref
  const [selectedDate, setSelectedDate] = useState(midnightToday);
  const midnightToday = new Date();
  midnightToday.setHours(0, 0, 0, 0);

  //THIS TRIGGERS THE BUTTON TO SAVE THE TIME
  const saveDateTime = () => {
    if (datePickerRef.current != null) {
      const selectedDate1 = datePickerRef.current.getSelectedDate();
      setSelectedDate(selectedDate1);
    }
    else {
      console.log('Please select a date and time');
    }
    console.log(selectedDate);
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
