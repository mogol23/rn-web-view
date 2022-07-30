import { Box, Divider, FlatList, Heading, HStack, Icon, Pressable, Stack, Text, VStack } from 'native-base';
import React, { PureComponent } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { viewport } from '../../helpers';
import dateTime, { generateRandomDate } from '../../utils/dateTime';
import { AppBar, BackgroundImage } from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react- native -screens react-freeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-nativeze@1.0.0" has incorrect peer dependency "react@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor sir amet "react-native-screens react-freeze@1.0.0" ht@^17.0.0".'
        },
        {
          date: generateRandomDate(),
          text: 'Lorem ipsum dor'
        },
      ],
      formData: {
        email: '',
        password: '',
      },
    };

    const { navigation } = props;

    this.drawer = [
      {
        title: 'SPP',
        icon: {
          name: 'build',
          as: MaterialIcons
        },
        onPress: () => {
          navigation.navigate("SppStack",
            {
              screen: "SelectSantri",
              params: { nextScreen: "Spp" }
            }
          );
        }
      },
      {
        title: 'Uang Saku',
        icon: {
          name: 'build',
          as: MaterialIcons
        },
        onPress: () => {
          navigation.navigate("UangSakuStack",
            {
              screen: "SelectSantri",
              params: { nextScreen: "InputAmount" }
            }
          );
        }
      },
      {
        title: 'Laundry',
        icon: {
          name: 'build',
          as: MaterialIcons
        },
        onPress: () => {
          navigation.navigate("LaundryStack",
            {
              screen: "SelectSantri",
              params: { nextScreen: "Laundry" }
            }
          );
        }
      },
      {
        title: 'Zakat',
        icon: {
          name: 'build',
          as: MaterialIcons
        },
        onPress: () => {
          navigation.navigate("Zakat");
        }
      },
      {
        title: 'Infaq',
        icon: {
          name: 'build',
          as: MaterialIcons
        },
        onPress: () => {
          navigation.navigate("Infaq");
        }
      },
      {
        title: 'Shodaqoh',
        icon: {
          name: 'build',
          as: MaterialIcons
        },
        onPress: () => {
          navigation.navigate("Shodaqoh");
        }
      },
    ]
  }

  render() {
    const { formData, datas } = this.state;
    const { navigation } = this.props;
    return (
      <Stack flex={1} alignItems={'center'}>
        <BackgroundImage />
        <AppBar containerProps={{ zIndex: 99 }} />
        <FlatList
          w={"90%"}
          ListHeaderComponent={() => (
            <>
              <FlatList
                py={2}
                scrollEnabled={false}
                data={this.drawer}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable onPress={item.onPress}>
                      {({
                        isHovered,
                        isFocused,
                        isPressed
                      }) => {
                        return (
                          <Box
                            w={viewport.width / 4}
                            h={viewport.width / 5}
                            my={2}
                            borderColor="primary.300"
                            shadow="3"
                            bg={isPressed ? "primary.200" : isHovered ? "primary.200" : "primary.100"}
                            rounded="5"
                            p={'5px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            style={{
                              transform: [{
                                scale: isPressed ? 0.96 : 1
                              }]
                            }}>
                            <Icon name={item.icon.name} as={item.icon.as} size="sm" />
                            <Text mt="3" fontSize="xs">
                              {item.title}
                            </Text>
                          </Box>
                        )
                      }}
                    </Pressable>
                  );
                }}
              />
              <Heading>
                Berita
              </Heading>
            </>
          )}
          showsVerticalScrollIndicator={false}
          data={datas}
          renderItem={({ item, index }) => {
            return (
              <Box>
                <HStack alignItems={'flex-start'}>
                  <VStack alignItems={'center'} w={'40px'} h={'40px'} p={'2px'} bg='primary.500'>
                    <Text fontSize={'sm'} fontWeight={'bold'}>{dateTime(item.date, 'D')}</Text>
                    <Text fontSize={'xs'}>{dateTime(item.date, 'MMM')}</Text>
                  </VStack>
                  <HStack flex={1} h={'40px'} bg='primary.100' p={'2px'} overflow={'hidden'}>
                    <Text numberOfLines={2} ellipsizeMode="tail" fontSize={'xs'}>{item.text}</Text>
                  </HStack>
                </HStack>
              </Box>
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
