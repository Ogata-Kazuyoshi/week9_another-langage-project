import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  DatePickerIOS,
  Button,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Checkbox, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../customs/CustomeButton';
import { changeDate } from '../../controllers/controller';
import { rates } from '../../data/ratedata';
import dbApi from '../../api/dbApi';
import { Alert } from 'react-native';

const ModifyModal = (props) => {
  const { setIsModifyModal, userId, setUserAllData, currentContent, memoId } =
    props;
  const [content, setContent] = useState(currentContent.Content || '');
  const [value, setValue] = useState(String(currentContent.Jpy) || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [checked, setChecked] = React.useState(currentContent.AtJp);
  const [selectedValue, setSelectedValue] = useState(
    currentContent.Category || '食費'
  );
  const [selectedDate, setDate] = useState(
    new Date(currentContent.BoughtDate.slice(0, 10)) || new Date('2023-10-01')
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const resisterHandler = async () => {
    const sendData = {};
    sendData.bought_date = changeDate(selectedDate);
    sendData.category = selectedValue;
    sendData.content = content;
    sendData.at_jp = checked;
    let currentRate;
    for (const elm of rates) {
      if (elm.rateDate === changeDate(selectedDate)) {
        currentRate = elm.rate;
        break;
      }
    }
    if (checked) {
      sendData.jpy = +value;
      sendData.krw = +value / currentRate;
    } else {
      sendData.jpy = +value * currentRate;
      sendData.krw = +value;
    }
    console.log('sendDate : ', sendData);

    const res = await dbApi.update(sendData, memoId);
    console.log('res update: ', res);
    const getAll = await dbApi.getUserDB(userId);
    setUserAllData(getAll.data);
    Alert.alert(res.data.message, '', [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
    setIsModifyModal(false);
  };

  return (
    <View style={styles.modal}>
      <View style={styles.inputArea}>
        <View style={styles.inputcontainer}>
          <IconButton icon="calendar" size={30} onPress={showDatePicker} />
          <Text style={{ fontSize: 15 }}>{changeDate(selectedDate)}</Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={selectedDate}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/* <View style={styles.container}> */}
        <View style={{ width: '100%' }}>
          <Text style={styles.contentTitle}>カテゴリー</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            // style={styles.picker}
          >
            <Picker.Item label="食費" value="食費" />
            <Picker.Item label="交際費" value="交際費" />
            <Picker.Item label="日用品" value="日用品" />
            <Picker.Item label="交通費" value="交通費" />
            <Picker.Item label="美容" value="美容" />
            <Picker.Item label="その他" value="その他" />
          </Picker>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.contentTitle}>内容</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => setContent(text)}
            value={content}
          />
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.contentTitle}>
            {checked ? `金額[円]` : `金額[ウォン]`}
          </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => setValue(text)}
            value={value}
          />
        </View>
        <View style={styles.checkArea}>
          <View
            style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10 }}
          >
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
          <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 'bold' }}>
            日本で購入
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 2,
          }}
        >
          <CustomButton
            title="変更"
            onPress={resisterHandler}
            buttonNumber={3}
          />
          <CustomButton
            title="キャンセル"
            onPress={() => {
              console.log('キャンセルボタンが押されました');
              setIsModifyModal(false);
            }}
            buttonNumber={3}
          />
          <IconButton
            icon="trash-can-outline"
            size={25}
            onPress={async () => {
              console.log('delete押された : ', memoId);
              const res = await dbApi.delete(memoId);
              console.log('res delete: ', res);
              const getAll = await dbApi.getUserDB(userId);
              setUserAllData(getAll.data);
              Alert.alert(res.data.message, '', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
              setIsModifyModal(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(202, 202, 202, 0.752)',
    zIndex: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  inputArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.8,
    height: windowHeight * 0.85,
    backgroundColor: 'rgb(189, 250, 151)',
    borderRadius: 20,
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  container: {
    height: 10, // ここでコンテナの高さを制限します
    borderWidth: 1,
    borderColor: '#000',
  },
  picker: {
    height: '100%', // ピッカーがコンテナの全体を占めるようにします
  },
  checkArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ModifyModal;
