/* eslint-disable react-native/no-inline-styles */
import type {Node} from 'react';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import {
  Button,
  Divider,
  Headline,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [date, setDate] = React.useState(new Date(null));
  const [city, setCity] = React.useState('');
  const [vaccineType, setVaccineType] = React.useState('');
  const [sideEffects, setSideEffects] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');
  const [gender, setGender] = React.useState('');

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const showDatepicker = () => {
    showMode();
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Headline style={{marginLeft: 5}}>COVID-19 Survey Page</Headline>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                marginRight: 5,
              }}>
              <TextInput
                accessibilityLabel="name"
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 5,
              }}>
              <TextInput
                accessibilityLabel="surname"
                label="Surname"
                value={surname}
                onChangeText={text => setSurname(text)}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Selected Birth Date: {date.toLocaleDateString()}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Button mode="contained" onPress={showDatepicker}>
                Select Birth date
              </Button>
            </View>
          </View>
          <TextInput
            accessibilityLabel="city"
            label="City"
            value={city}
            onChangeText={text => setCity(text)}
            style={{marginTop: 10}}
          />
          <RadioButton.Group
            style={{marginTop: 10}}
            onValueChange={newValue => setGender(newValue)}
            value={gender}>
            <Text style={{marginLeft: 5, marginTop: 10}}>Gender</Text>
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </RadioButton.Group>
          <Divider style={{color: 'red'}} />
          <RadioButton.Group
            onValueChange={newValue => setVaccineType(newValue)}
            value={vaccineType}>
            <Text style={{marginLeft: 5, marginTop: 10}}>Vaccine Type</Text>
            <RadioButton.Item
              label="mRNA (Pfizer Biontech, Moderna)"
              value="mrna"
            />
            <RadioButton.Item
              label="Inactive (Sinovac, Turkovac)"
              value="inactive"
            />
            <RadioButton.Item
              label="Viral Vector (Astrazeneca)"
              value="viralVector"
            />
          </RadioButton.Group>
          <TextInput
            accessibilityLabel="sideEffects"
            style={{marginTop: 10}}
            label="Side Effects"
            value={sideEffects}
            onChangeText={text => setSideEffects(text)}
          />
          <TextInput
            accessibilityLabel="symptoms"
            style={{marginTop: 10}}
            label="Any PCR positive cases and Covid-19 symptoms after 3rd vaccination"
            value={symptoms}
            onChangeText={text => setSymptoms(text)}
          />
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{marginTop: 10}}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
