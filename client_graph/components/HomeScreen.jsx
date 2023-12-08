import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from './customs/CustomeButton';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
// import Orientation from 'react-native-orientation-locker';

const HomeScreen = (props) => {
  const { navigation, user, userId } = props;
  useEffect(() => {
    // // 画面が表示されたときに実行される処理
    // Orientation.unlockAllOrientations();
    // return () => {
    //   //   // 画面が非表示になったときに実行される処理
    //   Orientation.lockToPortrait();
    // };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{`ようこそ、 ${user} さん`}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomButton
          title="家計簿"
          onPress={() => navigation.navigate('家計簿')}
          buttonNumber={1}
        />
        <CustomButton
          title="為替グラフ"
          onPress={() => navigation.navigate('為替グラフ')}
          buttonNumber={1}
        />
        <CustomButton
          title="設定画面"
          onPress={() => navigation.navigate('設定画面')}
          buttonNumber={1}
        />
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgb(255, 234, 158)',
    borderColor: 'black',
  },
  scrollbar: {
    // width: windowWidth * 0,
  },
});

export default HomeScreen;

// import React, { useEffect } from 'react';
// import Orientation from 'react-native-orientation-locker';

// const UserScreen = () => {
//   useEffect(() => {
//     // 画面が表示されたときに実行される処理
//     Orientation.unlockAllOrientations();

//     return () => {
//       // 画面が非表示になったときに実行される処理
//       Orientation.lockToPortrait();
//     };
//   }, []);

//   // ここにUserScreenのコンポーネントの内容を書く
// };

// export default UserScreen;
