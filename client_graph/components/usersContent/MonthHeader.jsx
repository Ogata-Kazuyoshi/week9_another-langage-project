import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Dimensions } from 'react-native';

const MonthHeader = (props) => {
  const { currentMonth, setCurrentMonth } = props;
  return (
    <View style={styles.monthHeader}>
      <IconButton
        icon="arrow-left-drop-circle"
        size={35}
        onPress={() => {
          console.log('clickbefore');
          if (currentMonth === 1) {
            setCurrentMonth(12);
          } else {
            setCurrentMonth(currentMonth - 1);
          }
        }}
      />
      <Text
        style={{ fontSize: 30, fontWeight: 'bold' }}
      >{`${currentMonth}月`}</Text>
      <IconButton
        icon="arrow-right-drop-circle"
        size={35}
        onPress={() => {
          console.log('clickNext');
          if (currentMonth === 12) {
            setCurrentMonth(1);
          } else {
            setCurrentMonth(currentMonth + 1);
          }
        }}
      />
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  monthHeader: {
    height: windowHeight * 0.05,
    backgroundColor: 'rgb(202, 202, 202)',
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8,
  },
});

export default MonthHeader;
