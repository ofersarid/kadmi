import React, { PureComponent } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import styles from './styles.scss';
import types from './types';

class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { checked, children, cn, onChange } = this.props;
    return (
      <div
        className={cx(
          'ripple',
          styles.checkBox,
          cn,
        )}
        onClick={onChange}
      >
        <div className={cx(
          styles.inner,
          checked && styles.checked,
        )}
        >
          {children}
        </div >
      </div >
    );
  }
}

CheckBox.propTypes = types;

export default CheckBox;
