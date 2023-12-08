import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';

const GraphArea = () => {
  const screenWidth = Dimensions.get('window').width;
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
    <View style={styles.graphArea}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <VictoryPie
          data={data2}
          colorScale="qualitative"
          theme={VictoryTheme.material}
        />
      </View> */}
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  graphArea: {
    height: windowHeight * 0.25,
    backgroundColor: '#61dafbaa',
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default GraphArea;
