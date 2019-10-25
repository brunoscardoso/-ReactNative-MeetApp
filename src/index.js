import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar, YellowBox } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import App from './App';

YellowBox.ignoreWarnings([
  '`-[RCTRootView cancelTouches]` is deprecated and will be deleted soon.', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
]);

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#2B1A2F" />
        <App />
      </PersistGate>
    </Provider>
  );
}
