import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomTableHeader = (props) => {
  const { isJpy } = props;
  return (
    <View style={styles.table}>
      <View style={{ ...styles.row, width: 50, height: 30 }}>
        <Text style={styles.eachtitle}>日付</Text>
      </View>
      <View style={{ ...styles.row, width: 200, height: 30 }}>
        <Text style={styles.eachtitle}>内容</Text>
      </View>
      <View style={{ ...styles.row, width: 50, height: 30 }}>
        <Text style={styles.eachtitle}>{isJpy ? `[￥]` : `ウォン`}</Text>
      </View>
      <View style={{ ...styles.row, width: 50, height: 30 }}>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
  },
  row: {
    // flexDirection: 'row',`
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowwrap: {
    flexDirection: 'row',
  },
  eachtitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomTableHeader;
