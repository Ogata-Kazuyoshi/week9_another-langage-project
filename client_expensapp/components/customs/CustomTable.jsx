import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const CustomTable = ({ data, dataID }) => {
  return (
    <View style={styles.table}>
      {data.map((row, i) => (
        <View key={i} style={styles.rowwrap}>
          <View style={{ ...styles.row, width: i === 1 ? 200 : 50 }}>
            <Text>{row}</Text>
          </View>
          {i === 2 && (
            <View style={{ ...styles.row, width: 50 }}>
              <IconButton
                icon="arrow-right-drop-circle"
                size={15}
                onPress={() => {
                  console.log('pushされたID : ', dataID);
                }}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
  },
  rowwrap: {
    flexDirection: 'row',
  },
});

export default CustomTable;
