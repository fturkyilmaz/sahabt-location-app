import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {applyMiddleware, createStore, compose} from 'redux';
import {rootReducer} from './reducer';

const middleware = [promise, thunk];

const persistConfig = {
  key: 'location1.0',
  whiteList: ['system'],
  storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  undefined,
  compose(applyMiddleware(...middleware)),
);

export const storePersist = persistStore(store);

export default store;
