import React, { Fragment } from 'react';
import cx from 'classnames';
import { Phone } from 'styled-icons/material'
import styles from './styles.scss';

const Home = () => {
  return (
    <Fragment >
      <div className={styles.header} >
        <button
          className={cx('button', styles.clickCall)}
          onClick={() => document.location.href = 'tel:972509013034'} >
          <Phone />
          050-901-3034
        </button >
        <div className={styles.logo} />
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
  )
};

export default Home;
