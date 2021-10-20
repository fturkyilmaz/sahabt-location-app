import React from 'react';
import StackNavigator from './src/navigators';
import './src/i18n';

import {I18nextProvider} from 'react-i18next';

import {Provider as StoreProvider} from 'react-redux';
import store, {storePersist} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    // <I18nextProvider i18n={i18n}>
    <StoreProvider store={store}>
      <PersistGate persistor={storePersist}>
        <StackNavigator />
      </PersistGate>
    </StoreProvider>
    // </I18nextProvider>
  );
};

export default App;
