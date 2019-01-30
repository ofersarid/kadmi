import PropTypes from 'prop-types';

export default {
  children: PropTypes.any,
  position: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
  content: PropTypes.node,
  className: PropTypes.string,
};
