import { useNavigation } from '@react-navigation/core';
import {
  ArrowBackIcon, Box,
  Center, HamburgerIcon, HStack, Icon, IconButton,
  Image,
  Stack
} from 'native-base';
import { InterfaceHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import { ColorType } from 'native-base/lib/typescript/components/types';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { isIphoneX, viewport } from '../../helpers';

const logo = require('./../../assets/images/logo.png');
const logoWidth = viewport.width / 4;

interface componentProps {
  bgColor: ColorType;
  showMenu: Boolean;
  back: Boolean;
  containerProps: InterfaceHStackProps
}

const index: React.FC<componentProps> = ({ bgColor, showMenu, containerProps, back, ...props }) => {
  const navigation: any = useNavigation();
  return (
    <HStack
      pt={Platform.select({ios: isIphoneX() ? StatusBar.currentHeight : 0})}
      bgColor={bgColor}
      px="1"
      py="2"
      space={1}
      alignItems="center"
      shadow="3"
      {...containerProps}
    >
      <Stack minH="12" minW="12">
        {showMenu && !back && (
          <IconButton
            icon={<HamburgerIcon size="lg" color="primary.50" />}
            onPress={() => {
              if (
                'toggleDrawer' in navigation ||
                'closeDrawer' in navigation ||
                'openDrawer' in navigation
              ) {
                return navigation.toggleDrawer();
              }
            }}
          />
        )}
        {back && (
          <IconButton
            icon={<ArrowBackIcon size="lg" color="primary.50" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
      </Stack>
      <Center flex={1}>
        <HStack>
          <Image
            source={logo}
            alt="logo"
            size="sm"
            resizeMode="contain"
            width={logoWidth}
          />
          <Box
            mx="10"
            position={'absolute'}
            bottom={1}
            _text={{
              fontSize: 'xs',
              fontWeight: 'medium',
              color: 'white',
              letterSpacing: 'lg',
            }}>
            Dalwa Bangil
          </Box>
        </HStack>
      </Center>
      <Stack minH="12" minW="12">
        {showMenu && (
          <IconButton
            icon={<Icon name="shopping-cart" as={MaterialIcons} size="lg" color="primary.50" />}
              onPress={() => {
                navigation.navigate("Cart");
              }}
          />
        )}
            </Stack>
    </HStack>
  );
};

index.defaultProps = {
  bgColor: 'primary.600',
  showMenu: true,
  back: false
};

export default index;
