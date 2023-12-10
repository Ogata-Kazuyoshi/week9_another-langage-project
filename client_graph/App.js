import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import HomeScreen from './components/HomeScreen';
import UserScreen from './components/UserScreen';
import { useState } from 'react';
import RateGraph from './components/RateGraph';
import Setting from './components/Setting';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

export default function App() {
  const [user, SetUser] = useState('なかた ともこ');
  const [userId, SetUserId] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(10);
  const [isJpy, setIsJpy] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} userId={userId} />}
        </Stack.Screen>
        <Stack.Screen name="家計簿">
          {(props) => (
            <UserScreen
              {...props}
              user={user}
              userId={userId}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              isJpy={isJpy}
              setIsJpy={setIsJpy}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="為替グラフ" component={RateGraph} />
        <Stack.Screen name="設定画面" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <VictoryPie
    //     data={data2}
    //     colorScale="qualitative"
    //     theme={VictoryTheme.material}
    //   />
    // </View>
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
