import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { connect } from 'react-redux';
import {
  Laundry,
  SelectSantri
} from '../screens';

const Stack = createNativeStackNavigator();

const Index = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName="SelectSantri" headerMode="screen">
      <Stack.Screen
        name="SelectSantri"
        component={SelectSantri}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Laundry"
        component={Laundry}
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