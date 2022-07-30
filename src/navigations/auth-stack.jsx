import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login, ForgotPassword, Register } from './../screens';
import { isIphoneX } from '../helpers';
import { View } from 'native-base';

const Stack = createNativeStackNavigator();

const index = () => {

  return (
    <View style={{ flex: 1, top: isIphoneX ? 0 : 0 }}>
      <Stack.Navigator
        initialRouteName="Login"
        headerMode="screen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </View>
  );
};

export default index;
