import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MonthHeader from './usersContent/MonthHeader';
import GraphArea from './usersContent/GraphArea';
import DisplyaArea from './usersContent/DisplyaArea';
import { ScrollView } from 'react-native';
import dbApi from '../api/dbApi';
import Modal from './usersContent/Modal';
import ModifyModal from './usersContent/ModifyModal';
import { filterMonth } from '../controllers/controller';

const UserScreen = (props) => {
  const { user, userId, currentMonth, setCurrentMonth, isJpy, setIsJpy } =
    props;
  const [userAllData, setUserAllData] = useState([]);
  const [displayData, setDisplyaData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isModifyModal, setIsModifyModal] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  const [memoId, setMemoId] = useState(null);

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
    <View>
      {isModal && (
        <Modal
          setUserAllData={setUserAllData}
          setIsModal={setIsModal}
          userId={userId}
        />
      )}
      {isModifyModal && (
        <ModifyModal
          setUserAllData={setUserAllData}
          setIsModifyModal={setIsModifyModal}
          userId={userId}
          currentContent={currentContent}
          memoId={memoId}
        />
      )}
      <MonthHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <GraphArea
        displayData={displayData}
        setDisplyaData={setDisplyaData}
        isJpy={isJpy}
      />

      <DisplyaArea
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
    </View>
  );
};

export default UserScreen;
