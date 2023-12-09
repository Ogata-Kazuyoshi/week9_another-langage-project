import React from 'react';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { changeTimeZone } from '../../../controllers/controller';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import { colorType } from '../../../data/categoryName';

const DisplyanArea = (props) => {
  const {
    displayData,
    isJpy,
    setIsJpy,
    userAllData,
    setUserAllData,
    setIsModal,
    setIsModifyModal,
    setMemoId,
    setCurrentContent,
  } = props;

  return (
    <div style={styles.mainwrap}>
      <div style={styles.headerwrap}>
        <div style={styles.plusIconwrap}>
          <AddToQueueIcon style={styles.plusIcon} />
        </div>
        <div style={styles.buttonwrap}>
          <button style={styles.buttonIcon}>JPY → KRW</button>
        </div>
      </div>
      <div style={styles.datawrap}>
        <div style={styles.datatable}>
          <div style={styles.dataHeader}>
            <div
              style={{
                ...styles.shortcontent,
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              日付
            </div>
            <div
              style={{
                ...styles.longcontent,
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              内容
            </div>
            <div
              style={{
                ...styles.shortcontent,
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              [円]
            </div>
            <div
              style={{
                ...styles.shortcontent,
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></div>
          </div>
          <div style={styles.dataContent}>
            <div style={styles.rawData}>
              {displayData.map((elm, i) => {
                const needData = [
                  changeTimeZone(elm.BoughtDate),
                  elm.Content.length <= 13
                    ? elm.Content
                    : `${elm.Content.slice(0, 13)}...`,
                  isJpy ? elm.Jpy : elm.Krw,
                ];
                console.log('needData');
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.eachrow,
                      backgroundColor: colorType[elm.Category],
                    }}
                  >
                    <div
                      style={{
                        ...styles.shortcontent,
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {needData[0]}
                    </div>
                    <div
                      style={{
                        ...styles.longcontent,
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {needData[1]}
                    </div>
                    <div
                      style={{
                        ...styles.shortcontent,
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {needData[2]}
                    </div>
                    <div
                      style={{
                        ...styles.shortcontent,
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <EditIcon />
                    </div>
                    {/* {needData.map((elm2, i) => {
                      return (
                        <div key={uuidv4()}>
                          <div style={styles.shortcontent}>{elm2}</div>
                          {i == 2 && (
                            <div>
                              <EditIcon />
                            </div>
                          )}
                        </div>
                      );
                    })} */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainwrap: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    height: '100%',
  },
  headerwrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '100px',
    marginRight: '100px',
    alignItems: 'center',
  },
  plusIconwrap: {},
  plusIcon: {
    fontSize: '50px',
  },
  buttonwrap: {
    width: '200px',
    height: '60px',
  },
  buttonIcon: {
    height: '100%',
    width: '100%',
    borderRadius: '20px',
    fontSize: '28px',
    backgroundColor: 'rgb(255, 234, 158)',
  },
  datawrap: {
    // border: '1px solid black',
    height: '92%',
    display: 'flex',
    justifyContent: 'center',
  },
  datatable: {
    // border: '1px solid black',
    width: '80%',
    marginTop: '20px',
    height: '97%',
    display: 'flex',
    flexDirection: 'column',
  },
  dataHeader: {
    // border: '1px solid black',
    height: '50px',
    display: 'flex',
  },
  shortcontent: {
    border: '1px solid black',
    width: '150px',
    height: '100%',
  },
  longcontent: {
    border: '1px solid black',
    width: '440px',
    height: '100%',
  },
  dataContent: {
    height: '100%',
    border: '1px solid black',
    overflow: 'auto',
  },
  rawData: {
    // backgroundColor: 'gray',
    // height: '1000px',
  },
  eachrow: {
    display: 'flex',
    height: '50px',
  },
};

export default DisplyanArea;
