import { fromJS } from 'immutable';
import currentDevice from 'current-device';

const initialState = fromJS({
  type: currentDevice.type,
});

const device = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default device;
