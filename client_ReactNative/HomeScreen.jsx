import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = (props) => {
  const { navigation } = props;
  return (
    <View>
      <Text>ホーム画面</Text>
      <Button title="ユーザー" onPress={() => navigation.navigate('User')} />
    </View>
  );
};

export default HomeScreen;
