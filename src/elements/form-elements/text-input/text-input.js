import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';
import types from './types';

const TextInput = props => (
  <input
    type="text"
    className={cx(styles.textInput, props.cn)}
    placeholder={props.placeholder}
    onChange={e => props.onChange(e.currentTarget.value)}
  />
);

TextInput.propTypes = types;

export default TextInput;
