import { Button, Center, FormControl, Pressable, Badge, Spacer, Flex, Image, Input, Icon, VStack, HStack, FlatList, Box, Divider, Stack, Text, Heading, IconButton, ScrollView } from 'native-base';
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
        <ScrollView flex={1} w={'90%'} showsVerticalScrollIndicator={false}>
            <Text color={'red.400'}>Data Mandatory</Text>
            <FormControl>
              <FormControl.Label>Nama Lengkap</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>No Telp</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <Text color={'red.400'}>Jika Santri</Text>
            <FormControl>
              <FormControl.Label>NIS</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <Text color={'red.400'}>Jika Alumni</Text>
            <FormControl>
              <FormControl.Label>Tahun Lulus</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Jenjang Terakhir</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <Text color={'red.400'}>Jika Wali Santri</Text>

            <FormControl>
              <FormControl.Label>NIS 1</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>NIS 2</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>NIS 3</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>
            <Button
              my={3}
              onPress={this.onSubmit.bind(this)}>Kirim</Button>
        </ScrollView>
      </Stack>
    );
  }
}

export default index;
