import React from 'react';
import StackNavigator from './src/navigators';
import './src/i18n';
import {Provider as StoreProvider} from 'react-redux';
import store, {storePersist} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={storePersist}>
        <StackNavigator />
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
