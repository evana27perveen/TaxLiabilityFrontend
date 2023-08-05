import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './src/Screens/AuthScreen/SignUp';
import Login from './src/Screens/AuthScreen/Login';
import Home from './src/Screens/CommonScreens/Home';
import History from './src/Screens/CommonScreens/History';
import Me from './src/Screens/CommonScreens/Me';
import Taxes from './src/Screens/CommonScreens/Taxes';
import UpdateMe from './src/Screens/CommonScreens/UpdateMe';
import Notifications from './src/Screens/CommonScreens/Notifications';
import Notice from './src/Screens/CommonScreens/Notice';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="History" component={History} options={{ headerShown: false }}/>
          <Stack.Screen name="Me" component={Me} options={{ headerShown: false }}/>
          <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}/>
          <Stack.Screen name="Notice" component={Notice} options={{ headerShown: false }}/>
          <Stack.Screen name="UpdateMe" component={UpdateMe} options={{ headerShown: false }}/>
          <Stack.Screen name="Taxes" component={Taxes} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
