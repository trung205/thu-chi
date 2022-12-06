/**
 * @format
 */

import {persistor, store} from '@redux';
import {AppRegistry, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {name as appName} from './app.json';
import App from './src/App';

export const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
