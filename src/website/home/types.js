import PropTypes from 'prop-types';
import { deviceTypes } from '/src/cms/device/types';

export const home = {
  ...deviceTypes
};

export const category = {
  ...deviceTypes,
  bgImg: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
