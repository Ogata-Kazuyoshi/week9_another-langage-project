import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colorType } from '../../data/categoryName';
import { changeTimeZone } from '../../controllers/controller';

const CustomTable = ({
  data,
  isJpy,
  setIsModifyModal,
  setMemoId,
  setCurrentContent,
}) => {
  // const needData = [elm.ID, elm.Content, isJpy ? elm.Jpy : elm.Krw];
  const needData = [
    changeTimeZone(data.BoughtDate),
    data.Content.length <= 13
      ? data.Content
      : `${data.Content.slice(0, 13)}...`,
    isJpy ? data.Jpy.toFixed(0) : data.Krw.toFixed(0),
  ];
  return (
    <View
      style={{ ...styles.table, backgroundColor: colorType[data.Category] }}
    >
      {needData.map((row, i) => (
        <View key={i} style={styles.rowwrap}>
          <View style={{ ...styles.row, width: i === 1 ? 200 : 50 }}>
            <Text>{row}</Text>
          </View>
          {i === 2 && (
            <View style={{ ...styles.row, width: 50 }}>
              <IconButton
                icon="application-edit-outline"
                size={15}
                onPress={() => {
                  console.log('pushされたID : ', data.ID);
                  const currntObj = { ...data };
                  setCurrentContent(currntObj);
                  setMemoId(data.ID);
                  setIsModifyModal(true);
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
    // flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  rowwrap: {
    flexDirection: 'row',
  },
});

export default CustomTable;
