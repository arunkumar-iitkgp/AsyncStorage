// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@storage_Key';
const NEW_STORAGE_KEY = '@new_storage_key';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');
  // Example of adding the two new states inside your Component
const [newInputText, setNewInputText] = useState('');
const [displayedDetails, setDisplayedDetails] = useState('');

  const storeData = async (value) => {
    if (!value.trim()) {
      Alert.alert('Validation Error', 'Cannot store an empty value. Please enter some text.');
      return;
    }
  

    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);

      await AsyncStorage.setItem(NEW_STORAGE_KEY, newInputText);

      setStoredValue(value); // Update UI immediately
      setDisplayedDetails(newInputText); // Update UI immediately
      setInputValue(''); // Clear input after saving
      setNewInputText(''); // Clear input after saving
    } catch (e) {
      console.error('Failed to save data', e);
    }
  };
 

  const getData = async () => {
    try {
      const primary = await AsyncStorage.getItem(STORAGE_KEY);
      if (primary !== null) {
        setStoredValue(primary);
      } else {
        setStoredValue('No data found');
      }

      const secondary = await AsyncStorage.getItem(NEW_STORAGE_KEY);
      if (secondary !== null) {
        // Set the display state to show it on the front-end
        setDisplayedDetails(secondary);
      }
    } catch (e) {
      console.error('Failed to retrieve data', e);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setStoredValue('');
      await AsyncStorage.removeItem(NEW_STORAGE_KEY);
      setNewInputText('');
      setDisplayedDetails('');
      console.log('Data cleared successfully');
    } catch (e) {
      console.error('Failed to clear data', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AsyncStorage Example</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Primary Input:</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter something..."
        value={inputValue}
        onChangeText={setInputValue}
      />
        <Text style={{ fontSize: 16, marginVertical: 10 }}>
          Stored Details: {storedValue}
        </Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Enter secondary details..."
          value={newInputText}
          onChangeText={(text) => setNewInputText(text)}
          style={{ borderWidth: 1, padding: 10, marginVertical: 10 }} // Add your own styles
        />

        {/* Front display for the data */}
        <Text style={{ fontSize: 16, marginVertical: 10 }}>
          Stored Details: {displayedDetails}
        </Text>
      </View>
      <View style={styles.spacer} >
        <Button title="Store Data" onPress={() => storeData(inputValue)} testID='storeData'/>
        <Button title="Retrieve Data" onPress={getData} testID='retrieveData'/>
        <Button title="Clear Data" onPress={clearData} testID='clearData'/>

      </View>
      <Text style={styles.text} testID='storedId'>Stored Value: {storedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
