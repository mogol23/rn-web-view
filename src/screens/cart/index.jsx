import moment from 'moment';
import { Badge, Box, Button, Checkbox, CheckCircleIcon, Divider, FlatList, Heading, HStack, Icon, IconButton, Spacer, Stack, Text, VStack } from 'native-base';
import React, { PureComponent } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
          productName: 'SPP Bulan Maret',
          amount: "Rp 390.000",
          paid: false
        },
        {
          productName: 'SPP Bulan Juli',
          amount: "Rp 390.000",
          paid: false
        },
        {
          productName: 'Laundry Bulan Juli',
          amount: "Rp 120.000",
          paid: false
        },
        {
          productName: 'Uang Saku',
          amount: "Rp 500.000",
          paid: false
        }
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
                    <Text fontSize={'sm'}>{item.productName}</Text>
                    <Text fontSize={'2xs'}>{item.amount}</Text>
                  </VStack>
                  <IconButton
                    size="md"
                    variant="ghost"
                    _icon={{
                      name: 'remove-shopping-cart',
                      as: MaterialIcons,
                      size: 'sm',
                      color: 'red.500'
                    }}
                  />
                </HStack>
              </HStack>
            );
          }}
          ItemSeparatorComponent={() => (
            <Divider />
          )}
          ListFooterComponent={(
            <Stack>
              <HStack my={3} justifyContent={'space-between'}>
                <Text fontWeight={'bold'}>Total dipilih:</Text>
                <Text fontWeight={'bold'}>Rp. 0</Text>
              </HStack>
              <Button
                onPress={this.onSubmit.bind(this)}
                leftIcon={<Icon as={MaterialCommunityIcons} name="send-check-outline" size="sm" />}
              >Checkout</Button>
            </Stack>
          )}
        />
      </Stack>
    );
  }
}

export default index;
