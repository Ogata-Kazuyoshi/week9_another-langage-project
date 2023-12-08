import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const CustomButton = ({ onPress, title, buttonNumber }) => (
  <TouchableOpacity onPress={onPress} style={styles[`button${buttonNumber}`]}>
    <View style={styles.buttonContainer}>
      <Text style={styles[`text${buttonNumber}`]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button1: {
    backgroundColor: 'rgb(255, 234, 158)',
    borderColor: 'black',
    padding: 10,
    borderRadius: 20,

    height: 100,
    width: windowWidth * 0.7,
    marginBottom: 30,
    marginTop: 30,
    display: 'flex',
  },
  text1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button2: {
    backgroundColor: 'rgb(255, 234, 158)',
    borderColor: 'black',
    borderRadius: 10,

    height: 30,
    width: windowWidth * 0.3,
    marginTop: 10,
    display: 'flex',
  },
  text2: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  button3: {
    backgroundColor: 'rgb(255, 234, 158)',
    borderColor: 'black',
    borderRadius: 10,

    height: 30,
    width: windowWidth * 0.23,
    marginTop: 10,
    display: 'flex',
  },
  text3: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
