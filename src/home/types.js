import PropTypes from 'prop-types';

const types = {
  deviceType: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  deviceOrientation: PropTypes.oneOf(['landscape', 'portrait']),
};

export default types;
