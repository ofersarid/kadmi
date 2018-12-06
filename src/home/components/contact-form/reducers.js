import { fromJS } from 'immutable';
import { ACTIONS } from './constants';

const initialState = fromJS({
  name: '',
  phone: '',
  interest: {
    pergola: false,
  },
});

const device = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.STORE_NAME:
      return state.set('name', action.name);
    case ACTIONS.PHONE:
      return state.set('phone', action.phone);
    default:
      return state;
  }
};

export default device;
