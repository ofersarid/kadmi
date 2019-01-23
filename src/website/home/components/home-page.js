import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import types from '../types';
import { compose } from 'redux';

const HomePage = props => {
  return (
    <Fragment >
      <h1>Home Page</h1>
    </Fragment >
  );
};

HomePage.propTypes = types;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  // events: selectors.filteredOrderedList(state, 'events'),
});

export default compose(
  connect(mapStateToProps, {}),
  // firestoreConnect(() => ([{
  //   collection: 'events',
  //   orderBy: ['dateTime', 'desc'],
  //   where: [['active', '==', true]],
  // }])),
)(HomePage);
