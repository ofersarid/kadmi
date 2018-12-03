import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Phone } from 'styled-icons/material';
import styles from './styles.scss';
import { device } from '../device/selectors';

const Home = () => {
  return (
    <Fragment >
      <div className={styles.header} >
        <div className={styles.logo} />
        <button
          className={cx('button', styles.clickCall)}
          onClick={() => {
            document.location.href = 'tel:972509013034';
          }} >
          <Phone />
          050-901-3034
        </button >
      </div >
      <div className={styles.movieContainer} >
        <iframe
          src="https://www.youtube.com/embed/gGvOmNaP9zU?showinfo=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.movie}
        />
      </div >
    </Fragment >
  );
};

const mapStateToProps = state => ({
  device: device(state),
});

export default connect(mapStateToProps, {})(Home);
