import {HEIGHT_PICKER_ITEM} from '@constants';
import React, {forwardRef, useRef} from 'react';
import {Animated, FlatList} from 'react-native';
import {PickerItem} from '@components';

export interface ScrollPickerProps {
  data: Array<any>;
  value?: string;
  onValueChange: (value: string) => void;
  initialScrollIndex: number;
}

export const ScrollPicker = forwardRef<FlatList, ScrollPickerProps>(
  (
    {data, value, onValueChange, initialScrollIndex}: ScrollPickerProps,
    ref,
  ) => {
    const dataList = ['', '', ...data, '', ''];
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
      <FlatList
        ref={ref}
        initialScrollIndex={initialScrollIndex}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={dataList}
        snapToInterval={HEIGHT_PICKER_ITEM}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return <PickerItem label={item} key={index} />;
        }}
        onMomentumScrollEnd={() => {
          let offset = Number.parseInt(JSON.stringify(scrollY));
          let result = offset / HEIGHT_PICKER_ITEM;
          onValueChange && onValueChange(data[result]);
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
        getItemLayout={(data, index) => ({
          length: HEIGHT_PICKER_ITEM,
          offset: HEIGHT_PICKER_ITEM * index,
          index,
        })}
      />
    );
  },
);
