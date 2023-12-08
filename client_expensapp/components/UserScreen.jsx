import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MonthHeader from './usersContent/MonthHeader';
import GraphArea from './usersContent/GraphArea';
import DisplyaArea from './usersContent/DisplyaArea';
import { ScrollView } from 'react-native';
import dbApi from '../api/dbApi';

const UserScreen = (props) => {
  const { user, userId, currentMonth, setCurrentMonth } = props;
  const [userAllData, setUserAllData] = useState([]);
  const [displayData, setDisplyaData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await dbApi.getUserDB(userId);
      console.log('res userdataAll', res);
      setUserAllData(res.data);
    };
    getUserData();
  }, []);
  useEffect(() => {
    setDisplyaData(userAllData);
  }, [userAllData]);

  return (
    <View>
      <MonthHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <GraphArea />

      <DisplyaArea displayData={displayData} setDisplyaData={setDisplyaData} />
    </View>
  );
};

export default UserScreen;
