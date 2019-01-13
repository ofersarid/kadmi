import PropTypes from 'prop-types';

export const deviceTypes = {
  deviceType: PropTypes.oneOf(['desktop', 'mobile', 'tablet']).isRequired,
  deviceOrientation: PropTypes.oneOf(['landscape', 'portrait']).isRequired,
};

const types = {
  storeOrientation: PropTypes.func.isRequired,
};

export default types;
