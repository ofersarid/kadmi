import { combineReducers } from 'redux-immutable';
import device from './device/reducers';

const combined = combineReducers({
  device,
});

export default combined;
