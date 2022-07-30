import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { connect } from 'react-redux';
import {
  Cart,
  Home,
  InputAmount
} from '../screens';
import AuthStack from './auth-stack';
import SppStack from './spp-stack';
import LaundryStack from './laundry-stack';
import UangSakuStack from './uang-saku-stack';

const Stack = createNativeStackNavigator();

const Index = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <AuthStack />
    )
  }

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SppStack"
        component={SppStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UangSakuStack"
        component={UangSakuStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LaundryStack"
        component={LaundryStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Zakat"
        component={InputAmount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Infaq"
        component={InputAmount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Shodaqoh"
        component={InputAmount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}
export default connect(mapStateToProps)(Index);