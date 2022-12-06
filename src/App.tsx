import {RootNavigator} from '@navigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {CustomModal, Loading} from '@components';
import {useSelector} from 'react-redux';
import {RootState} from '@redux';
import {PortalProvider} from '@gorhom/portal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const loading = useSelector(
    (state: RootState) => state.app.loading,
  ) as boolean;
  const modal = useSelector((state: RootState) => state.alert);
  return (
    <>
      <NavigationContainer>
        {/* <StatusBar
          backgroundColor={'transparent'}
          translucent
          barStyle={'dark-content'}
        /> */}
        <GestureHandlerRootView style={{flex: 1}}>
          <PortalProvider>
            <RootNavigator />
          </PortalProvider>
        </GestureHandlerRootView>
        {loading && <Loading />}
      </NavigationContainer>
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        icon={modal.icon}
        cancelable={modal.cancelable}
        onNegativeButton={modal.onNegativeButton}
        onPositiveButton={modal.onPositiveButton}
        onRequestClose={modal.onRequestClose}
        onBackdropPress={modal.onBackdropPress}
      />
    </>
  );
};

export default App;
