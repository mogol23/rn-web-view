import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {
  ChangePassword,
  UpdateProfile
} from '../screens';
import { AppDrawer } from '../components';
import { connect } from 'react-redux';
import AppStack from './app-stack';

const Drawer = createDrawerNavigator();

function drawer({ isLoggedIn }) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="AppStack"
      screenOptions={{ headerShown: false }}
      drawerContent={props => <AppDrawer {...props} />}>
      <Drawer.Screen
        name="AppStack"
        options={{
          title: 'Beranda',
        }}
        component={AppStack}
      />
      <Drawer.Screen
        name="ChangePassword"
        options={{
          title: 'Perbarui Kata Sandi',
        }}
        component={ChangePassword}
      />
      <Drawer.Screen
        name="UpdateProfile"
        options={{
          title: 'Perbarui Profil',
        }}
        component={UpdateProfile}
      />
    </Drawer.Navigator>
  );
}

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}

export default connect(mapStateToProps)(drawer);
