import PropTypes from 'prop-types';

const types = {
  children: PropTypes.any.isRequired,
  cn: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default types;
