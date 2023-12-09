import React, { useEffect, useState } from 'react';
import { colors, CategoryName, colorType } from '../../../data/categoryName';
import { VictoryPie, VictoryTheme } from 'victory';
import '../../../App.css';

const GraphArea = (props) => {
  const { displayData, setDisplayData, isJpy } = props;
  // const screenWidth = Dimensions.get('window').width;
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
    <div style={styles.graphTop}>
      <div style={styles.calcuwrap}>
        <div style={styles.calcuarea}>
          {colors.map((elm, i) => {
            return (
              <div key={i} style={styles.eachTotwrap}>
                <div style={{ ...styles.eachTotLael, backgroundColor: elm }}>
                  {CategoryName[i]}
                </div>
                <div style={{ ...styles.eachTot, backgroundColor: elm }}>
                  {jpyTot.length !== 0
                    ? isJpy
                      ? jpyTot[i].y.toFixed(0)
                      : krwTot[i].y.toFixed(0)
                    : ''}
                </div>
              </div>
            );
          })}
          <div style={styles.totWrap}>
            <div style={styles.totLabel}>合計</div>
            <div style={styles.Tot}>
              {jpyTot.length !== 0
                ? isJpy
                  ? `${jpyTot
                      .reduce((acc, crr) => acc + crr.y, 0)
                      .toFixed(0)} 円`
                  : `${krwTot
                      .reduce((acc, crr) => acc + crr.y, 0)
                      .toFixed(0)} ウォン`
                : ''}
            </div>
          </div>
        </div>
      </div>
      <div style={styles.graphwrap}>
        <VictoryPie
          data={isJpy ? jpyobj : krwobj}
          colorScale={selectedColor}
          theme={VictoryTheme.material}
          width={370}
          height={370}
          style={{
            labels: { fontSize: 15, fill: '#000000', fontWeight: 'bold' },
          }} // ラベルのフォントサイズを設定
          labelRadius={70} // ラベルの位置を調整
        />
      </div>
    </div>
  );
};

const styles = {
  graphTop: {
    height: '100%',
    overflow: 'hidden',
  },
  graphArea: {
    //   height: windowHeight * 0.3,
    // backgroundColor: '#61dafbaa',
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row',
  },
  calcuwrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0px',
  },
  calcuarea: {
    marginTop: '10px',
    marginLeft: '10px',
    // padding: 10,
  },
  eachTotwrap: {
    display: 'flex',
  },
  eachTotLael: {
    height: '40px',
    width: '200px',
    fontSize: '25px',
    textAlign: 'center',
  },
  eachTot: {
    height: '40px',
    width: '200px',
    fontSize: '25px',
    textAlign: 'center',
  },
  totWrap: {
    display: 'flex',
  },
  totLabel: {
    height: '40px',
    width: '200px',
    borderColor: 'black',
    borderWidth: '2px',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  Tot: {
    height: '40px',
    width: '200px',
    borderColor: 'black',
    borderWidth: '2px',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  graphwrap: {
    marginTop: '0px',
  },
};

export default GraphArea;
