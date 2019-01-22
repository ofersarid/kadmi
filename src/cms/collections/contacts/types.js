import PropTypes from 'prop-types';

export const contactForm = {
  onSend: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export const contactsCMS = {
  children: PropTypes.any,
};
