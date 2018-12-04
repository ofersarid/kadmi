import currentDevice from 'current-device';
import { store } from '../index';
import { storeOrientation } from './actions';

currentDevice.onChangeOrientation(newOrientation => {
  store.dispatch(storeOrientation(newOrientation));
});
