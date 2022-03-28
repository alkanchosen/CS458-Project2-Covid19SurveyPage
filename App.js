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

import {
  Button,
  Divider,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [date, setDate] = React.useState('');
  const [city, setCity] = React.useState('');
  const [vaccineType, setVaccineType] = React.useState('');
  const [sideEffects, setSideEffects] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const onSubmit = () => {
    const parts = date.split('/');
    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const todaysDate = new Date();

    if (birthDate <= todaysDate) {
      setSnackbarText('Form successfully submitted.');
      clearFields();
    } else {
      setSnackbarText('Enter a valid birth date!');
    }

    setVisible(!visible);
  };

  const clearFields = () => {
    setName('');
    setSurname('');
    setDate('');
    setCity('');
    setSideEffects('');
    setSymptoms('');
    setVaccineType('');
    setGender('');
  };

  const onDismissSnackBar = () => setVisible(false);

  const isFormFilled = () => {
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4}$/;
    return (
      name !== '' &&
      surname !== '' &&
      dateRegex.test(date) &&
      city !== '' &&
      vaccineType !== '' &&
      sideEffects !== '' &&
      symptoms !== '' &&
      gender !== ''
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {/*<Headline style={{marginLeft: 5}}>COVID-19 Survey Page</Headline>*/}
          <View style={{flexDirection: 'row', marginTop: 10}}>
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
          <TextInput
            accessibilityLabel="birthDate"
            label="Birth Date (DD/MM/YYYY)"
            value={date}
            onChangeText={text => setDate(text)}
            style={{marginTop: 5}}
          />
          <TextInput
            accessibilityLabel="city"
            label="City"
            value={city}
            onChangeText={text => setCity(text)}
            style={{marginTop: 5}}
          />
          <RadioButton.Group
            style={{marginTop: 5}}
            onValueChange={newValue => setGender(newValue)}
            value={gender}
            accessibilityLabel="gender">
            <Text style={{marginLeft: 5, marginTop: 10}}>Gender</Text>
            <RadioButton.Item
              accessibilityLabel="male"
              label="Male"
              value="male"
            />
            <RadioButton.Item
              accessibilityLabel="female"
              label="Female"
              value="female"
            />
          </RadioButton.Group>
          <Divider style={{color: 'red'}} />
          <RadioButton.Group
            accessibilityLabel="vaccineType"
            onValueChange={newValue => setVaccineType(newValue)}
            value={vaccineType}>
            <Text style={{marginLeft: 5, marginTop: 10}}>Vaccine Type</Text>
            <RadioButton.Item
              label="mRNA (Pfizer Biontech, Moderna)"
              value="mrna"
              accessibilityLabel="mrna"
            />
            <RadioButton.Item
              label="Inactive (Sinovac, Turkovac)"
              value="inactive"
              accessibilityLabel="inactive"
            />
            <RadioButton.Item
              label="Viral Vector (Astrazeneca)"
              value="viralVector"
              accessibilityLabel="viralVector"
            />
          </RadioButton.Group>
          <TextInput
            accessibilityLabel="sideEffects"
            style={{marginTop: 5}}
            label="Side Effects"
            value={sideEffects}
            onChangeText={text => setSideEffects(text)}
          />
          <TextInput
            accessibilityLabel="symptoms"
            style={{marginTop: 5}}
            label="Any Covid-19 symptoms after 3rd vaccination"
            value={symptoms}
            onChangeText={text => setSymptoms(text)}
          />
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View
              style={{
                flex: 1,
                marginRight: 5,
              }}>
              <Button
                accessibilityLabel="clearButton"
                icon="trash-can"
                mode="contained"
                onPress={clearFields}
                style={{marginTop: 10}}>
                Clear Fields
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 5,
              }}>
              {isFormFilled() ? (
                <Button
                  accessibilityLabel="submitButton"
                  icon="send"
                  mode="contained"
                  onPress={onSubmit}
                  style={{marginTop: 10}}>
                  Submit
                </Button>
              ) : null}
            </View>
          </View>
          <Snackbar
            id="snackbar"
            accessibilityLabel="snackbar"
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            action={{
              label: 'Hide',
              onPress: () => {
                onDismissSnackBar();
              },
            }}>
            {snackbarText}
          </Snackbar>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
