import { Button, Center, FormControl, Pressable, Badge, Spacer, Flex, Image, Input, Icon, VStack, HStack, FlatList, Box, Divider, Stack, Text, Heading, IconButton } from 'native-base';
import React, { PureComponent } from 'react';
import { auth } from '../../api';
import { viewport } from '../../helpers';
import dateTime, { generateRandomDate } from '../../utils/dateTime';
import Assets from './../../assets';
import { AppBar, BackgroundImage } from './../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
      },
    };
  }


  setData(field) {
    return value => {
      this.setState(state => ({
        ...state,
        formData: {
          ...state.formData,
          [field]: value,
        },
      }));
    };
  }

  onSubmit() {
    const { formData } = this.state;
    auth.login(formData.email, formData.password);
  }

  render() {
    const { formData, datas } = this.state;
    const { navigation } = this.props;
    return (
      <Stack flex={1} alignItems={'center'}>
        <BackgroundImage />
        <AppBar containerProps={{ zIndex: 99 }} />
        <VStack width="90%" mx="3" space={2}>
          <FormControl>
            <FormControl.Label>Kata sandi lama</FormControl.Label>
            <Input
              secureTextEntry
              value={formData.password}
              placeholder=""
              onChangeText={value => this.setData('password')(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Kata sandi</FormControl.Label>
            <Input
              secureTextEntry
              value={formData.password}
              placeholder=""
              onChangeText={value => this.setData('password')(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Ulangi kata sandi</FormControl.Label>
            <Input
              secureTextEntry
              value={formData.password}
              placeholder=""
              onChangeText={value => this.setData('password')(value)}
            />
          </FormControl>
          <Button
            my={3}
            onPress={this.onSubmit.bind(this)}>Kirim</Button>
        </VStack>
      </Stack>
    );
  }
}

export default index;
