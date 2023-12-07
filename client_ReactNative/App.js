import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import dbApi from './api/dbApi';

export default function App() {
  const getAllHandler = async () => {
    const res = await dbApi.getDB();
    console.log('resAll : ', res.data);
  };
  const getSingleHandler = async () => {
    const res = await dbApi.getSingleDB(1);
    console.log('resSingle : ', res.data);
  };
  const createNewHandler = async () => {
    const sendDate = {
      //newCreateはtodo.goの20-31行のCreateTodoを通るので、Todoと同じ型でないといけない。
      content: 'aaa',
      // created_at: new Date(),
      UserId: 5,
    };
    const res = await dbApi.createNew(sendDate);
    // console.log('resSingle : ', res);
    Alert.alert(res.data.message, '', [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };
  const updateHandler = async () => {
    const sendDate = {
      //Updateはそのまま直接DBにknex likeなやつでアクセスに行くので、カラム名でないといけない。
      //todo.goのUPDATEtodo
      content: '1234',
      user_id: 5,
    };
    const res = await dbApi.update(sendDate, 4);
    console.log('Update : ', res);
    Alert.alert(res.data.message, '', [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };
  const deleteHandler = async () => {
    const res = await dbApi.delete(11);
    console.log('Update : ', res);
    Alert.alert(res.data.message, '', [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Button title="GetAll" onPress={getAllHandler} />
      <Button title="GetSingle" onPress={getSingleHandler} />
      <Button title="NewPost" onPress={createNewHandler} />
      <Button title="Update" onPress={updateHandler} />
      <Button title="delete" onPress={deleteHandler} />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
