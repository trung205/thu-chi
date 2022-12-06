import {Divider, Header, ItemProfile} from '@components';
import {useTheme} from '@hooks';
import React from 'react';
import {FlatList, View} from 'react-native';
import useProfile from './hook';
import {styles} from './styles';

export const Profile: React.FC = () => {
  const {showModal, listItem} = useProfile();
  const {colors} = useTheme();

  return (
    <>
      <Header
        title={'Cá nhân'}
        isRight
        iconRight={{type: 'ionicon', name: 'md-log-out-outline'}}
        rightAction={showModal}
      />

      <FlatList
        contentContainerStyle={[styles.list, {backgroundColor: colors.card}]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={listItem}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <ItemProfile
                text={item.text}
                icon={item.icon}
                iconBg={item.iconBg}
                onPress={item.onPress}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
      />
    </>
  );
};
