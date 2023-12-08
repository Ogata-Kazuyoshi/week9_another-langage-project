import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from './customs/CustomeButton';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';

const HomeScreen = (props) => {
  const { navigation, user, userId } = props;
  const graphSeed = {
    食費: 1000,
    交際費: 500,
    その他: 300,
    日用品: 100,
  };
  const data2 = Object.keys(graphSeed).map((key) => ({
    x: key,
    y: graphSeed[key],
  }));
  return (
    <View style={styles.container}>
      <Text>{`ようこそ、 ${user} さん`}</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <VictoryPie
          data={data2}
          colorScale="qualitative"
          theme={VictoryTheme.material}
        />
      </View>
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
