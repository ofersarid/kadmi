import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Phone } from 'styled-icons/material';
import styles from './styles.scss';
import { deviceType, deviceOrientation } from '../device/selectors';
import types from './types';

const Home = props => {
  return (
    <Fragment >
      <div className={cx(styles.header, styles[`header-${props.deviceType}-${props.deviceOrientation}`])} >
        <div className={cx(styles.logo, styles[`logo-${props.deviceType}`])} />
        <button
          className={cx('button', styles.clickCall, styles[`clickCall-${props.deviceType}`])}
          onClick={() => {
            document.location.href = 'tel:972509013034';
          }} >
          <Phone />
          050-901-3034
        </button >
      </div >
      <div className={cx(styles.movieContainer, styles[`movieContainer-${props.deviceType}-${props.deviceOrientation}`])} >
        <iframe
          src="https://www.youtube.com/embed/gGvOmNaP9zU?showinfo=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={cx(styles.movie, styles[`movie-${props.deviceType}-${props.deviceOrientation}`])}
        />
      </div >
    </Fragment >
  );
};

Home.propTypes = types;

const mapStateToProps = state => ({
  deviceType: deviceType(state),
  deviceOrientation: deviceOrientation(state),
});

export default connect(mapStateToProps, {})(Home);
