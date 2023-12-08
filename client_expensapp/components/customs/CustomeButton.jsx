import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const CustomButton = ({ onPress, title, buttonNumber }) => (
  <TouchableOpacity onPress={onPress} style={styles[`button${buttonNumber}`]}>
    <View style={styles.buttonContainer}>
      <Text style={styles.text}>{title}</Text>
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
  buttonContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default CustomButton;
