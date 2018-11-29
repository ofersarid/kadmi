import React, { Fragment } from 'react';
import styles from './styles';

const Home = () => (
  <Fragment>
    <iframe
      src="https://www.youtube.com/embed/4cEkV0bP-Wo?autoplay=1&showinfo=0"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={styles.movie}
    />
  </Fragment>
);

export default Home;
