import PropTypes from 'prop-types';
import { deviceTypes } from '/src/cms/device/types';

export const websiteMainContainer = {
  children: PropTypes.any,
};

export const navBar = {
  ...deviceTypes,
};

export const footer = {
  ...deviceTypes,
};
