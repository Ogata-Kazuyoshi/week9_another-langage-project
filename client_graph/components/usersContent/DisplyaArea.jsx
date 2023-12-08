import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomTable from '../customs/CustomTable';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import CustomTableHeader from '../customs/CustomeTableHeader';
import { IconButton } from 'react-native-paper';
import CustomButton from '../customs/CustomeButton';

const DisplyaArea = (props) => {
  const {
    displayData,
    isJpy,
    setIsJpy,
    userAllData,
    setUserAllData,
    setIsModal,
    setIsModifyModal,
    setMemoId,
    setCurrentContent,
  } = props;
  return (
    <View style={styles.allwrap}>
      <View style={styles.operateButton}>
        <View>
          <IconButton
            icon="clipboard-plus-outline"
            size={30}
            onPress={() => {
              console.log('+が押されました : ');
              setIsModal(true);
            }}
          />
        </View>
        <View>
          <CustomButton
            title={isJpy ? '→KRWへ' : '→JPYへ'}
            onPress={() => {
              console.log('buttonが押されました');
              setIsJpy(!isJpy);
            }}
            buttonNumber={2}
          />
        </View>
      </View>
      <CustomTableHeader isJpy={isJpy} />
      <View style={styles.scrollArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.displayArea}>
            {displayData.map((elm) => {
              const needData = [elm.ID, elm.Content, isJpy ? elm.Jpy : elm.Krw];
              return (
                <View key={elm.ID}>
                  <CustomTable
                    data={elm}
                    isJpy={isJpy}
                    setIsModifyModal={setIsModifyModal}
                    setMemoId={setMemoId}
                    setCurrentContent={setCurrentContent}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  displayArea: {
    // height: windowHeight * 0.4,
    // backgroundColor: 'rgb(202, 202, 202)',
    borderColor: 'black',
    // display: 'flex',
    // flexDirection: 'row',
  },
  allwrap: {
    // flex: 1,
    alignItems: 'center',
  },
  operateButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollArea: {
    height: windowHeight * 0.4,
  },
});

export default DisplyaArea;
