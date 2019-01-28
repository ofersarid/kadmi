import { deviceTypes } from '/src/cms/device/types';
import PropTypes from 'prop-types';

export const gallery = {
  ...deviceTypes,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  collection: PropTypes.string.isRequired,
};
