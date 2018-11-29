import React, { Fragment } from 'react';
import styles from './styles';

const Home = () => {
  return (
    <Fragment>
      <div style={styles.header}>
        <button
          className="button"
          style={styles.clickCall}
          onClick={() => document.location.href = 'tel:9725441042'} >
          054-477-1042
        </button >
        <div style={styles.logo}/>
      </div>
      <div style={styles.movieContainer}>
      <iframe
        src="https://www.youtube.com/embed/4cEkV0bP-Wo?autoplay=1&showinfo=0"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={styles.movie}
      />
      </div>
    </Fragment>
  )
};

export default Home;
