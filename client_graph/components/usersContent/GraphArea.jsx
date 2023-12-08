import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryTheme, VictoryPie } from 'victory-native';
import { CategoryName } from '../../data/categoryName';
import { colors } from '../../data/categoryName';
import { colorType } from '../../data/categoryName';

const GraphArea = (props) => {
  const { displayData, setDisplayData, isJpy } = props;
  const screenWidth = Dimensions.get('window').width;
  const [selectedColor, setSelectedColor] = useState(colors);
  const [jpyobj, setJpyobj] = useState({});
  const [krwobj, setKrwobj] = useState({});
  const [jpyTot, setJpyTot] = useState([]);
  const [krwTot, setKrwTot] = useState([]);

  useEffect(() => {
    let result = [];
    if (displayData.length !== 0) {
      for (const elmName of CategoryName) {
        const tempExpens = displayData.filter(
          (elm) => elm.Category === elmName
        );
        result.push(tempExpens);
      }
      // console.log('result Array : ', result);
    }
    let eachExpenseJPY = [];
    for (const elm of result) {
      const total = elm.reduce((acc, crr) => acc + crr.Jpy, 0);
      eachExpenseJPY.push(total);
    }
    let eachExpenseKRW = [];
    for (const elm of result) {
      const total = elm.reduce((acc, crr) => acc + crr.Krw, 0);
      eachExpenseKRW.push(total);
    }
    console.log('eachExpenseJPY : ', eachExpenseJPY);
    console.log('eachExpenseKRW : ', eachExpenseKRW);
    const JPYArray = {};
    eachExpenseJPY.forEach((elm, i) => {
      JPYArray[CategoryName[i]] = elm;
    });
    const KRWArray = {};
    eachExpenseKRW.forEach((elm, i) => {
      KRWArray[CategoryName[i]] = elm;
    });

    const jpyData = Object.keys(JPYArray).map((key) => ({
      x: key,
      y: JPYArray[key],
    }));
    const krwData = Object.keys(KRWArray).map((key) => ({
      x: key,
      y: KRWArray[key],
    }));
    console.log('jpyData : ', jpyData);
    console.log('krwData : ', krwData);
    setJpyTot(jpyData);
    setKrwTot(krwData);
    const nonZeroJpy = jpyData.filter((elm) => elm.y !== 0);
    const nonZeroKrw = krwData.filter((elm) => elm.y !== 0);
    console.log('nonZeroJpy : ', nonZeroJpy);
    console.log('nonZeroKrw : ', nonZeroKrw);
    const jpyDataKey = nonZeroJpy.map((elm) => elm.x);
    console.log('jpyDataKey : ', jpyDataKey);
    const tempColor = [];
    for (const elm of jpyDataKey) {
      tempColor.push(colorType[elm]);
    }
    console.log('colored : ', tempColor);
    setSelectedColor(tempColor);

    setJpyobj(nonZeroJpy);
    setKrwobj(nonZeroKrw);
  }, [displayData]);

  return (
    <View style={styles.graphArea}>
      <View style={styles.calcuarea}>
        {colors.map((elm, i) => {
          return (
            <Text style={{ ...styles.eachTot, backgroundColor: elm }} key={i}>
              {jpyTot.length !== 0
                ? isJpy
                  ? jpyTot[i].y.toFixed(0)
                  : krwTot[i].y.toFixed(0)
                : ''}
            </Text>
          );
        })}
        <Text style={styles.Tot}>
          {jpyTot.length !== 0
            ? isJpy
              ? `${jpyTot.reduce((acc, crr) => acc + crr.y, 0).toFixed(0)} 円`
              : `${krwTot
                  .reduce((acc, crr) => acc + crr.y, 0)
                  .toFixed(0)} ウォン`
            : ''}
        </Text>
      </View>
      <View>
        {Object.keys(jpyobj).length !== 0 && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <VictoryPie
              data={isJpy ? jpyobj : krwobj}
              colorScale={selectedColor}
              theme={VictoryTheme.material}
              width={270} // グラフの幅を設定
              height={270} // グラフの高さを設定
              style={{
                labels: { fontSize: 15, fill: '#000000', fontWeight: 'bold' },
              }} // ラベルのフォントサイズを設定
              labelRadius={70} // ラベルの位置を調整
            />
          </View>
        )}
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  graphArea: {
    height: windowHeight * 0.3,
    // backgroundColor: '#61dafbaa',
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row',
  },
  calcuarea: {
    marginTop: 10,
    marginLeft: 10,
    // padding: 10,
  },
  eachTot: {
    height: 25,
    width: 110,
    fontSize: 12,
    textAlign: 'center',
  },
  Tot: {
    height: 25,
    width: 110,
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default GraphArea;
