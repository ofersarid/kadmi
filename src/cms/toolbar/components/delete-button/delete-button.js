import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/cms/device';
import Button from '/src/cms/elements/button';
import { deleteButton } from '../../types';
import App from '/src/cms/app';
import { TrashAlt } from 'styled-icons/boxicons-solid/TrashAlt';

const DeleteButton = props => (
  <Button
    noAnimation
    onClick={props.onClickDelete}
    textColor={props.deleteMode ? 'yellow' : null}
    tip="Toggle Delete Mode"
    justIcon={props.isMobile}
  >
    <TrashAlt />
    {!props.isMobile && <div >Delete</div >}
  </Button >
);

DeleteButton.propTypes = deleteButton;

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
  deleteMode: App.selectors.deleteMode(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
