import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import StackGrid, { transitions } from 'react-stack-grid';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { selectors as collectionSelectors } from '/src/cms/collections';
import Puff from '/src/cms/elements/svg-loaders/puff.svg';
import ImageAsync from 'react-image-async';
import styles from './styles.scss';
import { gallery } from '../../types';

const { scaleUp } = transitions;

const calcColumnWidth = (isMobile) => {
  if (isMobile) {
    return '100%';
  }
  return `${Math.round(100 / (window.innerWidth / 350))}%`;
};

class Gallery extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imagesReady: false,
  //   };
  // }

  render() {
    const { list, deviceType } = this.props;
    const pics = list.reduce((collection, item) => {
      collection.push(item.pic);
      return collection;
    }, []);
    return (
      <div className={styles.gallery} >
        <ImageAsync src={pics} >
          {({ loaded, error }) => (
            loaded ? (
              <StackGrid
                columnWidth={calcColumnWidth(deviceType === 'mobile')}
                monitorImagesLoaded
                gutterWidth={10}
                gutterHeight={10}
                duration={1000}
                appearDelay={250}
                appear={scaleUp.appear}
                appeared={scaleUp.appeared}
                enter={scaleUp.enter}
                entered={scaleUp.entered}
                leaved={scaleUp.leaved}
                rtl
              >
                {list.map((item, i) => (
                  <img src={pics[i]} key={item.id} className={styles.galleryItem} />
                ))}
              </StackGrid >
            ) : (
              <div className={styles.loading}>
                <img src={Puff} />
              </div >
            )
          )}
        </ImageAsync >
      </div >
    );
  }
}

Gallery.propTypes = gallery;

Gallery.deafultProps = {
  list: [],
};

const mapStateToProps = (state, ownProps) => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  list: collectionSelectors.filteredOrderedList(state, ownProps.collection),
});

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(props => ([{
    collection: props.collection,
    where: [['active', '==', true]],
  }])),
)(Gallery);
