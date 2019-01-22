import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import autoBind from 'auto-bind';
import tippy from 'tippy.js';
import styles from './styles.scss';
import types from './types';
import Device from '../../device';

class Tooltip extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.initTip();
  }

  componentDidUpdate() {
    this.initTip();
  }

  initTip() {
    const { isMobile, content, position } = this.props;
    if (!isMobile) {
      tippy(this.ref.current, {
        content: `<div class="${styles.content}">${content}</div>`,
        animateFill: false,
        arrow: true,
        delay: [500, 0],
        placement: position,
      });
    }
  }

  render() {
    const { children, content, className } = this.props;
    return content ? (
      <div
        className={cx(className)}
        ref={this.ref}
      >
        {children}
      </div >
    ) : children;
  }
}

Tooltip.propTypes = types;

Tooltip.defaultProps = {
  position: 'top',
};

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
});

export default connect(mapStateToProps, {})(Tooltip);
