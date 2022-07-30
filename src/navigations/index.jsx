import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

const Index = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName="DrawerNav" headerMode="screen">
      {/* <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}
export default connect(mapStateToProps)(Index);