import { deviceTypes } from '/src/cms/device/types';
import PropTypes from 'prop-types';

export const aboutPageTypes = {
  ...deviceTypes,
  settings: PropTypes.shape({
    generalAssets: PropTypes.shape({
      aboutMe: PropTypes.string,
    }),
  }),
};
