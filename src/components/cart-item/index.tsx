import {
  HStack,
  Icon,
  Pressable,
  Stack,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { GestureResponderEvent } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/EvilIcons';

interface componentProps {
  leftIconName: string;
  amount: string;
  time: string;
  webCode: string;
  onPress: null | ((event: GestureResponderEvent) => void) | undefined;
}

const index: React.FC<componentProps> = ({
  leftIconName,
  amount,
  time,
  webCode,
  onPress,
}) => {
  return (
    <>
      
    </>
  );
};

index.defaultProps = {
  leftIconName: 'check',
};

export default index;
