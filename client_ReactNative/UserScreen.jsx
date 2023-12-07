import React from 'react';
import { View, Text, Button } from 'react-native';
import dbApi from './api/dbApi';

const UserScreen = () => {
  const getAllHandler = async () => {
    const res = await dbApi.getDB();
    console.log('resAll : ', res.data);
  };
  const getByuserHandler = async () => {
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
    <View>
      <Text>ユーザー画面</Text>
      <Button title="GetAll" onPress={getAllHandler} />
      <Button title="GetSingle" onPress={getByuserHandler} />
      <Button title="NewPost" onPress={createNewHandler} />
      <Button title="Update" onPress={updateHandler} />
      <Button title="delete" onPress={deleteHandler} />
    </View>
  );
};

export default UserScreen;
