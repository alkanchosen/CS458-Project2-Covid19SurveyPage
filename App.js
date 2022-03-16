import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
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
  const [city, setCity] = React.useState('');
  const [vaccineType, setVaccineType] = React.useState('');
  const [sideEffects, setSideEffects] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');
  const [gender, setGender] = React.useState('');

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Headline style={{marginLeft: 5}}>COVID-19 Survey Page</Headline>
          <TextInput
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            label="Surname"
            value={surname}
            onChangeText={text => setSurname(text)}
            style={{marginTop: 10}}
          />
          <TextInput
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
            style={{marginTop: 10}}
            label="Side Effects"
            value={sideEffects}
            onChangeText={text => setSideEffects(text)}
          />
          <TextInput
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
