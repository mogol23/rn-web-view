import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { isIphoneX } from '../helpers';
import DrawerNav from './drawer';
import AuthStack from './auth-stack';

const Stack = createNativeStackNavigator();

const Index = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <AuthStack />
    )
  }

  return (
    <Stack.Navigator initialRouteName="DrawerNav" headerMode="screen">
      <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
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