import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';

LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

export default function App() {
  const graphSeed = {
    食費: 1000,
    交際費: 500,
    その他: 300,
    日用品: 100,
  };
  const data2 = Object.keys(graphSeed).map((key) => ({
    x: key,
    y: graphSeed[key as keyof typeof graphSeed],
  }));
  // const data = Object.keys(graphSeed).map((key, index) => ({
  //   key,
  //   value: graphSeed[key as keyof typeof graphSeed],
  //   svg: {
  //     // fill: `#${(Math.random().toString(16) + '000000').substring(2, 8)}`,
  //     fill: `#ffffff`,
  //   }, // 6桁のランダムな色を生成
  // }));
  const data: { x: number; y: number }[] = [
    { x: 1, y: 3 },
    { x: 2, y: 2 },
    { x: 3, y: 5 },
    { x: 4, y: 0 },
    { x: 5, y: 7 },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VictoryPie
        data={data2}
        colorScale="qualitative"
        theme={VictoryTheme.material}
      />
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
