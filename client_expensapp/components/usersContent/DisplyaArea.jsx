import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomTable from '../customs/CustomTable';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';

const DisplyaArea = (props) => {
  const { displayData } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.displayArea}>
        {displayData.map((elm) => {
          // const needData = {
          //   ID: elm.ID,
          //   Content: elm.Content,
          //   Jpy: elm.Jpy,
          // };
          const needData = [elm.ID, elm.Content, elm.Jpy];
          return (
            <View key={elm.ID}>
              <CustomTable data={needData} dataID={elm.ID} />
              {/* <Text>{`ID=${elm.ID}`}</Text>
            <Text>{`Content=${elm.Content}`}</Text> */}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  displayArea: {
    // height: windowHeight * 0.4,
    backgroundColor: 'rgb(202, 202, 202)',
    borderColor: 'black',
    // display: 'flex',
    // flexDirection: 'row',
  },
});

export default DisplyaArea;
