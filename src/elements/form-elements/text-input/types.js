import PropTypes from 'prop-types';

const types = {
  placeholder: PropTypes.string.isRequired,
  cn: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default types;
