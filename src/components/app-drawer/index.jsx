import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  VStack,
  IconButton,
  Stack,
  Text,
  AlertDialog,
  Button,
} from 'native-base';
import React, { useState } from 'react';
import { Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { auth } from '../../api';
import { isIphoneX } from '../../helpers';

function CustomDrawerContent({ isLoggedIn, ...props }) {
  const [signoutDialogVisible, setSignoutDialogVisibility] = useState(false);
  const closeSignoutDialog = () => setSignoutDialogVisibility(false);

  const cancelRef = React.useRef(null);

  const signout = () => {
    closeSignoutDialog();
    auth.signout();
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Ganti Kata Sandi"
          onPress={() => Linking.openURL('https://lyzi.fr/contactez-nous/')}
        /> */}
      </DrawerContentScrollView>
      <VStack
        w="full"
        position="absolute"
        bottom={isIphoneX() ? 20 : 5}
        alignItems={'center'}
        justifyContent={'center'}>
        <IconButton
          display={!isLoggedIn ? 'none' : 'flex'}
          onPress={() => setSignoutDialogVisibility(true)}
          size="md"
          variant="outline"
          colorScheme="light"
          _icon={{
            name: 'logout',
            as: MaterialIcons,
            size: 'sm',
          }}
        />
        <Text>Version 1.0.5</Text>
      </VStack>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={signoutDialogVisible}
        onClose={closeSignoutDialog}>
        <AlertDialog.Content>
          <AlertDialog.Header>
            Anda yakin ingin keluar dari akun ini?
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <Button.Group w="full" justifyContent="space-between" p={0} m={0}>
              <Button my={0} colorScheme="danger" onPress={closeSignoutDialog}>
                Tidak
              </Button>
              <Button my={0} onPress={signout}>
                Ya
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}

export default connect(mapStateToProps)(CustomDrawerContent);
