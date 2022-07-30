import { Button, Center, FormControl, Image, Input, VStack } from 'native-base';
import React, { PureComponent } from 'react';
import { auth } from '../../api';
import { viewport } from '../../helpers';
import Assets from './../../assets';
import { AppBar, BackgroundImage } from './../../components';

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

          <FormControl>
            <FormControl.Label>Kata sandi</FormControl.Label>
            <Input
              secureTextEntry
              value={formData.password}
              placeholder=""
              onChangeText={value => this.setData('password')(value)}
            />
          </FormControl>
          <Button
            my={3}
            onPress={this.onSubmit.bind(this)}>Masuk</Button>
          <Button
            my={0}
            p={1}
            variant="ghost"
            onPress={() => navigation.navigate('ForgotPassword')}>
            Lupa kata sandi?
          </Button>
          <Button
            my={0}
            p={1}
            variant="ghost"
            onPress={() => navigation.navigate('Register')}>
            Daftar Akun Baru
          </Button>
        </VStack>
      </Center>
    );
  }
}

export default index;
