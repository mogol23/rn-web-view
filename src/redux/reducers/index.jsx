import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import global from './global';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(persistConfig, {
  global,
});

export default reducer;
