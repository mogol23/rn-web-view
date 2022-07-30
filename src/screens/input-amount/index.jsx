import { Button, FormControl, Input, Stack, VStack,Icon } from 'native-base';
import React, { PureComponent } from 'react';
import { toast } from '../../utils';
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

  onSubmit() {
    const { navigation } = this.props;

    toast('ditambahkan ke keranjang')
    navigation.navigate('Home')
  }

  navigateNext() {
    const { navigation } = this.props;
    navigation.navigate('Spp')
  }

  render() {
    const { formData, datas } = this.state;
    const { navigation } = this.props;
    return (
      <Stack flex={1} alignItems={'center'}>
        <BackgroundImage />
        <AppBar back={true} containerProps={{ zIndex: 99 }} />
        <VStack width="90%" mx="3" space={2}>
          <FormControl>
            <FormControl.Label>Nominal</FormControl.Label>
            <Input
              autoFocus
              keyboardType='number-pad'
              value={formData.email}
              placeholder=""
              onChangeText={value => this.setData('email')(value)}
            />
          </FormControl>
          <Button
              my={3}
              onPress={this.onSubmit.bind(this)}
              leftIcon={<Icon as={MaterialIcons} name="add-shopping-cart" size="sm" />}
            >Keranjang</Button>
        </VStack>
      </Stack>
    );
  }
}

export default index;
