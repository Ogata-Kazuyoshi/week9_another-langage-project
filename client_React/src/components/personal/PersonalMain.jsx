import React, { useEffect, useState } from 'react';
import MonthHeader from './personalMain/MonthHeader';
import GraphArea from './personalMain/GraphArea';
import DisplyanArea from './personalMain/DisplyanArea';
import dbApi from '../../api/dbApi';
import { filterMonth } from '../../controllers/controller';
import { useNavigate } from 'react-router-dom';

const PersonalMain = (props) => {
  const { isAuth } = props;
  const [user, SetUser] = useState('なかた ともこ');
  const [userId, SetUserId] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(10);
  const [isJpy, setIsJpy] = useState(true);
  const [userAllData, setUserAllData] = useState([]);
  const [displayData, setDisplyaData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isModifyModal, setIsModifyModal] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  const [memoId, setMemoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const res = await dbApi.getUserDB(userId);
      console.log('res userdataAll', res);
      setUserAllData(res.data);
    };
    getUserData();
  }, []);
  useEffect(() => {
    const filterd = filterMonth(currentMonth, [...userAllData]);
    setDisplyaData(filterd);
  }, [userAllData, currentMonth]);

  return (
    <div style={styles.mainwrap}>
      <div style={styles.monthHeader}>
        <MonthHeader user={user} />
      </div>
      <div style={styles.mainArea}>
        <div style={styles.graphArea}>
          <GraphArea
            displayData={displayData}
            setDisplyaData={setDisplyaData}
            isJpy={isJpy}
          />
        </div>
        <div style={styles.dataArea}>
          <DisplyanArea
            displayData={displayData}
            setDisplyaData={setDisplyaData}
            userAllData={userAllData}
            setUserAllData={setUserAllData}
            isJpy={isJpy}
            setIsJpy={setIsJpy}
            setIsModal={setIsModal}
            setIsModifyModal={setIsModifyModal}
            setMemoId={setMemoId}
            setCurrentContent={setCurrentContent}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainwrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '96vh',
    // overFlow: 'hidden',
  },
  monthHeader: {
    flex: '3%',
    backgroundColor: 'rgb(202, 202, 202)',
    // bordor: '1px solid black',
  },
  mainArea: {
    // flex: '95%',
    height: '90vh',
    display: 'flex',
  },
  graphArea: {
    flex: '40%',
    backgroundColor: 'rgb(246, 228, 247)',
  },
  dataArea: {
    flex: '60%',
    backgroundColor: 'rgb(246, 228, 247)',
    overflow: 'hidden',
  },
};

export default PersonalMain;
