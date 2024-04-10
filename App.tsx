import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { generatePassword } from './utils/generatePassword';
import Clipboard from '@react-native-clipboard/clipboard';



export default function App() {
  const [value, setValue] = useState<number>(6);
  const [includeCapitalLetters, setIncludeCapitalLetters] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const handleValueChange = (newValue: number) => {
    // Ensure the value is an integer between 6 and 20
    const intValue = Math.round(newValue);
    if (intValue >= 6 && intValue <= 20) {
      setValue(intValue);
    }
  };

  function handlePress() {
    Clipboard.setString(password);
    Alert.alert(
      'Password copied to clipboard',
      '',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }


  useEffect(() => {
    setPassword(generatePassword(value, includeCapitalLetters, includeNumbers, includeSpecialCharacters));
  }, [value, includeCapitalLetters, includeNumbers, includeSpecialCharacters]);

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.mainContainer}>

        <View style={styles.inputField}>
          <Text
            style={styles.valueStyle}
          >Select a value</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={6}
              maximumValue={20}
              step={1}
              minimumTrackTintColor="#0000ff"
              maximumTrackTintColor="#d3d3a8"
              thumbTintColor="#ff0000"
              value={value}
              onValueChange={handleValueChange}
            />
          </View>
          <Text
            style={styles.value}
          >Value: {value}</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="green"
            unFillColor="#FFFFFF"
            text="Include Capital Letters"
            iconStyle={{ borderColor: "green" }}
            innerIconStyle={{ borderWidth: 1 }}
            textStyle={{ fontFamily: "JosefinSans-Regular", color: "white", textDecorationLine: 'none', fontSize: 20 }}
            onPress={(isChecked: boolean) => { setIncludeCapitalLetters(isChecked) }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="blue"
            unFillColor="#FFFFFF"
            text="Include Numbers"
            iconStyle={{ borderColor: "blue" }}
            innerIconStyle={{ borderWidth: 1 }}
            textStyle={{ fontFamily: "JosefinSans-Regular", color: "white", textDecorationLine: 'none', fontSize: 20 }}
            onPress={(isChecked: boolean) => { setIncludeNumbers(isChecked) }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="orange"
            unFillColor="#FFFFFF"
            text="Include Special Characters"
            iconStyle={{ borderColor: "orange" }}
            innerIconStyle={{ borderWidth: 1 }}
            textStyle={{ fontFamily: "JosefinSans-Regular", color: "white", textDecorationLine: 'none', fontSize: 20 }}
            onPress={(isChecked: boolean) => { setIncludeSpecialCharacters(isChecked) }}
          />
        </View>
        <View style={styles.inputField}>
          <Text
            style={styles.valueStyle}
          >Password</Text>
          <View style={styles.showPassword}>
            <TouchableOpacity onPress={handlePress}>
              <Text
                selectable={true}
                style={styles.password}
              >{password}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: '80%',
    marginVertical: 10,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#002f3d',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  inputField: {
    marginTop: 30,
    padding: 10,
    borderColor: 'black',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: Dimensions.get('window').height * 0.2,
  },
  valueStyle: {
    fontSize: 25,
    padding: 10,
    color: 'white',
  },
  value: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  },
  checkboxContainer: {
    alignItems: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 50,
    gap: 10,
    fontSize: 30,
  },
  showPassword: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  password: {
    fontSize: 20,
    color: 'black',
  },
})
