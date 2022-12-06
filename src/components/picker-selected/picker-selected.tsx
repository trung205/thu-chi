import {styleCommon} from '@styles';
import React, {forwardRef, useRef, useState} from 'react';
import {Animated, FlatList, FlatListProps, View} from 'react-native';
import {PickerItem, Text} from '@components';
import {ITEM_HEIGHT} from '@constants';

interface SelectedPickerProps<T> extends FlatListProps<T> {
  data: Array<any>;
  keys: string;
}

export const PickerSelected = forwardRef<FlatList, SelectedPickerProps<any>>(
  ({data, keys}, ref) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    const onViewRef = React.useRef(viewableItems => {
      console.warn(viewableItems);
      setIndex(1);
      // Use viewable items in state or as intended
    });
    const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

    return (
      <>
        <Text>{index}</Text>
        <View style={styleCommon.container}>
          <FlatList
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            bounces={false}
            // ref={ref}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            data={data}
            renderItem={({item, index}) => {
              return <PickerItem key={index + keys} label={item} />;
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={16}
          />
        </View>
      </>
    );
  },
);
