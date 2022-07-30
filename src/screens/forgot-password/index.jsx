import { Button, Center, FormControl, Image, Input, VStack } from 'native-base';
import React, { PureComponent } from 'react';
import { auth } from '../../api';
import { AppBar, BackgroundImage } from './../../components';


class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
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
    auth.resetPassword(formData.email);
  }

  render() {
    const { formData } = this.state;
    const { navigation } = this.props;

    return (
      <Center flex={1}>
        <BackgroundImage />
        <AppBar bgColor={'transparent'} showMenu={false} />
        <VStack width="90%" mx="3" space={2}>
          <FormControl>
            <FormControl.Label>E-mail</FormControl.Label>
            <Input
              value={formData.email}
              placeholder=""
              onChangeText={value => this.setData('email')(value)}
            />
          </FormControl>
          <Button onPress={this.onSubmit.bind(this)}>Kirim</Button>
          <Button
            variant="ghost"
            onPress={() => navigation.navigate('Login')}>
            Ingat kata sandi?
          </Button>
        </VStack>
      </Center>
    );
  }
}

export default index;
