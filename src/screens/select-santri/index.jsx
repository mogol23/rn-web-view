import { Divider, FlatList, HStack, Pressable, Stack, Text, VStack, Box, Icon } from 'native-base';
import React, { PureComponent } from 'react';
import { viewport } from '../../helpers';
import { toast } from '../../utils';
import { AppBar, BackgroundImage } from './../../components';


class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      datas: [
        {
          id: 1,
          name: "Satri 1",
          nis: 12345,
        },
        {
          id: 1,
          name: "Satri 2",
          nis: 24545
        },
      ],
      formData: {
        email: '',
        password: '',
      },
    };
  }

  onSubmit() {
    toast('ditambahkan ke keranjang')
  }

  navigateNext() {
    const { navigation, route } = this.props;
    const { params: { nextScreen } } = route
    navigation.navigate(nextScreen)
  }

  render() {
    const { formData, datas } = this.state;
    const { navigation } = this.props;
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
              <Pressable onPress={this.navigateNext.bind(this)}>
                {({
                  isHovered,
                  isFocused,
                  isPressed
                }) => {
                  return (
                    <Box
                      flex={1} h={'40px'} py={'2px'} px={'5px'} overflow={'hidden'} justifyContent={'space-between'}
                      borderColor="primary.300"
                      shadow="3"
                      bg={isPressed ? "primary.200" : isHovered ? "primary.200" : "primary.100"}
                      p={'5px'}
                      style={{
                        transform: [{
                          scale: isPressed ? 0.96 : 1
                        }]
                      }}>
                      <HStack flex={1} h={'40px'} bg='primary.100' py={'2px'} px={'5px'} overflow={'hidden'} justifyContent={'space-between'}>
                        <VStack>
                          <Text fontSize={'sm'}>{item.name}</Text>
                          <Text fontSize={'2xs'}>{item.nis}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  )
                }}
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => (
            <Divider />
          )}
        />
      </Stack>
    );
  }
}

export default index;
