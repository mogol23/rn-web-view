import React from 'react';
import { Image, View } from 'native-base';
import Assets from "../../assets";
import { viewport } from '../../helpers';
import { InterfaceImageProps } from 'native-base/lib/typescript/components/primitives/Image/types';
import { Platform } from 'react-native';

const index: React.FC<InterfaceImageProps> = (props) => {
  return (
    <>
      {/* <View
        position={'absolute'}
        bg={'rgba(107,107,107,.2)'}
        width={viewport.width}
        height={viewport.height} /> */}
      <Image
        source={Assets.images.Bg2}
        position="absolute"
        width={viewport.width}
        height={viewport.height}
        // opacity={Platform.select({ ios: .5, android: .8 })}
        {...props} />

    </>
  )
};

export default index;