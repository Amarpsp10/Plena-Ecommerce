import React, {useState} from 'react';
import {Image} from '@rneui/themed';
import {View, Dimensions, ViewStyle, ImageStyle} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {$flexRowStyle, colors, spacing} from '../../theme';

type ImageCarouselProps = {
  images: string[];
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({images}) => {
  const width = Dimensions.get('screen').width;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const scrollOffsetValue = useSharedValue<number>(0);

  return (
    <View>
      <Carousel
        loop={false}
        enabled // Default is true, just for demo
        vertical={false}
        width={width}
        height={220}
        defaultScrollOffsetValue={scrollOffsetValue}
        testID={'xxx'}
        style={{width: width}}
        data={images}
        onConfigurePanGesture={g => g.enabled(false)}
        pagingEnabled={true}
        onSnapToItem={index => setCurrentImageIndex(index)}
        renderItem={({index}) => (
          <Image
            source={{
              uri: images[index],
            }}
            style={$image}
          />
        )}
      />
      <View style={$slideView}>
        {images.map((_, index) => (
          <View
            style={[
              $slide,
              {
                backgroundColor:
                  currentImageIndex !== index
                    ? colors.palette.neutral200
                    : colors.palette.secondary100,
              },
            ]}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

const $image: ImageStyle = {
  resizeMode: 'contain',
  width: '100%',
  height: '100%',
};

const $slideView: ViewStyle = {
  ...$flexRowStyle,
  justifyContent: 'flex-start',
  gap: spacing.small,
  position: 'absolute',
  bottom: 10,
  margin: spacing.small,
};

const $slide: ViewStyle = {
  width: 20,
  height: 5,
  borderRadius: 5,
};
