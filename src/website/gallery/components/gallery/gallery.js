import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import StackGrid, { transitions } from 'react-stack-grid';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { selectors as collectionSelectors } from '/src/cms/collections';
import Puff from '/src/cms/elements/svg-loaders/puff.svg';
import ImageAsync from 'react-image-async';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import styles from './styles.scss';
import { gallery } from '../../types';

const { scaleUp } = transitions;

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      lightBoxOpen: false,
      imagesReady: false,
    };

    this.gridRef = null;
  }

  componentDidUpdate(prevProps) {
    const { deviceOrientation } = this.props;
    if (this.gridRef && (deviceOrientation !== prevProps.deviceOrientation)) {
      setTimeout(() => {
        this.setState({ imagesReady: false });
      }, 0);
    }
  }

  activate() {
    setTimeout(() => {
      this.setState({ imagesReady: true });
    }, 1000);
    return null;
  }

  calcColumnWidth() {
    const { deviceType, deviceOrientation } = this.props;
    if (deviceType === 'mobile') {
      return deviceOrientation === 'landscape' ? '50%' : '100%';
    }
    return '33.3%';
  }

  render() {
    const { list } = this.props;
    const { photoIndex, lightBoxOpen, imagesReady } = this.state;
    const pics = list.reduce((collection, item) => {
      collection.push(item.pic);
      return collection;
    }, []);
    return (
      <div className={styles.gallery} >
        {!imagesReady && (
          <ImageAsync src={pics} >
            {({ loaded, error }) => (
              loaded ? this.activate() : null
            )}
          </ImageAsync >
        )}
        {!imagesReady && (
          <div className={styles.loading} >
            <img src={Puff} />
          </div >
        )}
        {imagesReady && (
          <StackGrid
            columnWidth={this.calcColumnWidth()}
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
            gridRef={ref => (this.gridRef = ref)}
          >
            {list.map((item, i) => (
              <div
                key={item.id}
                className={styles.galleryItem}
                onClick={() => {
                  this.setState({
                    photoIndex: i,
                    lightBoxOpen: true,
                  });
                }}
              >
                <label >{item.title}</label >
                <img src={item.pic} />
              </div >
            ))}
          </StackGrid >
        )}
        {lightBoxOpen && (
          <Lightbox
            mainSrc={list[photoIndex].pic}
            nextSrc={list[(photoIndex + 1) % list.length].pic}
            prevSrc={list[(photoIndex + list.length - 1) % list.length].pic}
            onCloseRequest={() => this.setState({ lightBoxOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + list.length - 1) % list.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % list.length,
              })
            }
            animationOnKeyInput
            animationDuration={500}
            enableZoom={false}
            clickOutsideToClose
          />
        )}
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
    orderBy: ['displayOrder', 'asc'],
  }])),
)(Gallery);
