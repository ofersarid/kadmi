import PropTypes from 'prop-types';

export const colors = [
  'green',
  'black',
  'black-invert',
  'white',
  'red',
  'yellow'
];

export const button = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
  linkTo: PropTypes.string,
  color: PropTypes.oneOf(colors),
  customBgColor: PropTypes.string,
  textColor: PropTypes.oneOf(colors),
  disable: PropTypes.bool,
  stretch: PropTypes.bool,
  invert: PropTypes.bool,
  noAnimation: PropTypes.bool,
  tip: PropTypes.node,
  maxWidth: PropTypes.number,
  justIcon: PropTypes.bool,
};
