import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import global from './global';
import user from './user';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(persistConfig, {
  user,
  global,
});

export default reducer;
