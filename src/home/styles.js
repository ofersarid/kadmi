import profilePic from './profile-pic.jpg';
import logo from './logo.png';

export default {
  movie: {
    width: '800px',
    height: '450px',
  },
  movieContainer: {
    padding: '10px',
    border: '1px solid black',
  },
  logo: {
    width: '690px',
    height: '450px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
  },
  header: {
    width: '100%',
    height: '230px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px',
    position: 'relative',
  },
  clickCall: {
    position: 'absolute',
    fontFamily: 'monospace',
    fontSize: '20px',
    transform: 'translateX(-240px)',
    padding: '10px',
    borderRadius: '3px',
    border: '1px solid black',
    cursor: 'pointer',
    outline: 'none',
  }
}
