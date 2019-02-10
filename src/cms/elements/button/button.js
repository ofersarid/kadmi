import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import Puff from '/src/cms/elements/svg-loaders/puff.svg';
import Tooltip from '/src/cms/elements/tooltip/tooltip';
import styles from './styles.scss';
import { button } from './types';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      working: false,
    };
    this.willUmnount = false;
  }

  componentWillUnmount() {
    this.willUmnount = true;
  }

  handleClick(e) {
    const { onClick, linkTo } = this.props;
    e.stopPropagation();
    if (onClick) {
      const promise = onClick(e);
      if (promise && promise.finally) {
        this.setState({ working: true });
        promise.finally(() => {
          if (!this.willUmnount) {
            this.setState({ working: false });
          }
        });
      }
    }
    if (linkTo) {
      hashHistory.push(linkTo);
    }
  }

  render() {
    const {
      className, textColor, color, children, disable, stretch, tip, maxWidth,
      noAnimation, justIcon, customBgColor,
    } = this.props;
    const { working } = this.state;
    return (
      <Tooltip content={tip} >
        <div
          className={cx(
            'ripple',
            'waves-effect',
            'waves-color',
            styles.button,
            className,
            disable && styles.disable,
            stretch && styles.stretch,
            noAnimation && styles.noAnimation,
          )}
          style={{
            maxWidth,
          }}
          onClick={this.handleClick}
        >
          {working && <img className={styles.activityIndicator} src={Puff} />}
          <div
            className={cx(
              'inner',
              styles.inner,
              styles[`text-${textColor}`],
              styles[color],
              working && styles.hideChildren,
              justIcon && styles.justIcon,
            )}
            style={{
              backgroundColor: customBgColor,
            }}
          >
            <Fragment >
              {children}
            </Fragment >
          </div >
        </div >
      </Tooltip >
    );
  }
}

Button.propTypes = button;

Button.defaultProps = {
  textColor: null,
  disable: false,
  stretch: false,
  justIcon: false,
};

const mapStateToProps = state => ({}); // eslint-disable-line

export default connect(mapStateToProps, {})(Button);
