import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device/index';
import types from '../types';
import * as selectors from '../../../cms/cms-entity-grid/selectors';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const HomePage = props => {
  return (
    <Fragment >
      <h1>Home Page</h1>
      <h2>My Events:</h2>
      {props.events.map(event => <div key={event.id}>{event.title}</div>)}
    </Fragment >
  );
};

HomePage.propTypes = types;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  events: selectors.filteredOrderedList(state, 'events'),
});

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect(() => ([{
    collection: 'events',
    orderBy: ['dateTime', 'desc'],
    where: [['active', '==', true]],
  }])),
)(HomePage);
