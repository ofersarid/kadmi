import React from 'react';
import { connect } from 'react-redux';
import Button from '/src/cms/elements/button';
import Device from '/src/cms/device';
import Routes from '/src/routes';
import { Tooltip } from '/src/cms/elements';
import { compose } from 'redux';
import { Collection } from 'styled-icons/boxicons-solid/Collection';
import { Contact } from 'styled-icons/boxicons-solid/Contact';
import { Event } from 'styled-icons/material/Event';
import { Group } from 'styled-icons/boxicons-solid/Group';
import { CartAlt } from 'styled-icons/boxicons-solid/CartAlt';
import styles from './styles.scss';
import { pageList } from '../../../types';
import { CMS_COLLECTIONS } from '../../../constants';
import { sideNavOpen } from '../../../selectors';

const PageList = props => {
  const iconResolver = collection => {
    switch (collection) {
      case 'contacts':
        return <Contact />;
      case 'events':
        return <Event />;
      case 'team':
        return <Group />;
      case 'products':
        return <CartAlt />;
      default:
        return <Collection />;
    }
  };

  return (
    <ul className={styles.pageList} >
      {CMS_COLLECTIONS.map(collection => {
        const isActive = Boolean(props.pathname.match(`/${collection}`));
        return (
          <li key={collection} >
            <Button
              linkTo={isActive ? null : `/cms/${collection}`}
              className={`waves-color ${styles.navButton}`}
              textColor={isActive ? 'green' : null}
              stretch
            >
              <Tooltip content={!props.sideNavOpen ? collection : null} position="right" >
                {iconResolver(collection)}
              </Tooltip >
              <div >{collection}</div >
              {isActive && (
                <div className={styles.indicator} />
              )}
            </Button >
          </li >
        );
      })}
    </ul >
  );
};

PageList.propTypes = pageList;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  pathname: Routes.selectors.pathname(state),
  isCMS: Routes.selectors.isCMS(state),
  sideNavOpen: sideNavOpen(state),
});

export default compose(
  connect(mapStateToProps, {}),
)(PageList);
