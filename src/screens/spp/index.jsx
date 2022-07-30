import moment from 'moment';
import { Badge, Box, Button, Checkbox, CheckCircleIcon, Divider, FlatList, HStack, Icon, Stack, Text, VStack } from 'native-base';
import React, { PureComponent } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../../api';
import { toast } from '../../utils';
import { instance as dateTimeHelperInstance } from '../../utils/dateTime';
import { AppBar, BackgroundImage } from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {
          month: 1,
          amount: "Rp 390.000",
          paid: true
        },
        {
          month: 2,
          amount: "Rp 390.000",
          paid: true
        },
        {
          month: 3,
          amount: "Rp 390.000",
          paid: false
        },
        {
          month: 4,
          amount: "Rp 390.000",
          paid: false
        },
        {
          month: 5,
          amount: "Rp 390.000",
          paid: false
        },
        {
          month: 6,
          amount: "Rp 390.000",
          paid: false
        },
        {
          month: 7,
          amount: "Rp 390.000",
          paid: false
        },
        {
          month: 8,
          amount: "Rp 390.000",
          paid: false
        },
      ],
      formData: {
        email: '',
        password: '',
      },
    };
  }

  onSubmit() {
    const { navigation } = this.props;
    toast('ditambahkan ke keranjang')
    navigation.navigate('Home')
    // const { formData } = this.state;
    // auth.login(formData.email, formData.password);
  }

  render() {
    const { formData, datas } = this.state;
    const { navigation, route } = this.props;
    console.log('------', route)
    return (
      <Stack flex={1} alignItems={'center'}>
        <BackgroundImage />
        <AppBar back={true} containerProps={{ zIndex: 99 }} />
        <FlatList
          mt={4}
          w={"90%"}
          showsVerticalScrollIndicator={false}
          data={datas}
          renderItem={({ item, index }) => {
            return (
              <HStack alignItems={'flex-start'}>
                <VStack alignItems={'center'} justifyContent={'center'} w={'40px'} h={'40px'} py={'2px'} px={'5px'} bg='primary.500'>
                  {item.paid
                    ? (<CheckCircleIcon color={'primary.100'} />)
                    : (<Checkbox />)
                  }
                </VStack>
                <HStack flex={1} h={'40px'} bg='primary.100' py={'2px'} px={'5px'} overflow={'hidden'} justifyContent={'space-between'}>
                  <VStack>
                    <Text fontSize={'sm'}>{dateTimeHelperInstance(item.month, 'M', 'MMMM')}</Text>
                    <Text fontSize={'2xs'}>{item.amount}</Text>
                  </VStack>
                  {!item.paid && moment().isAfter(dateTimeHelperInstance(item.month, 'M')) && (
                    <Badge colorScheme="error" alignSelf="center" variant={'outline'}>Terlambat</Badge>
                  )}
                </HStack>
              </HStack>
            );
          }}
          ItemSeparatorComponent={() => (
            <Divider />
          )}
          ListFooterComponent={(
            <Button
              my={3}
              onPress={this.onSubmit.bind(this)}
              leftIcon={<Icon as={MaterialIcons} name="add-shopping-cart" size="sm" />}
            >Keranjang</Button>
          )}
        />
      </Stack>
    );
  }
}

export default index;
