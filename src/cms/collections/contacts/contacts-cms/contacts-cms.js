import React from 'react';
import CMSEntityGrid from '/src/cms/cms-entity-grid/cms-entity-grid';
import { Contact } from 'styled-icons/boxicons-solid/Contact';
import { contactsCMS } from '../types';
import { ENTITY_FIELDS } from '../constants';

const EventsCMS = props => (
  <CMSEntityGrid
    route="/cms/contacts"
    collection="contacts"
    filters={['title', 'subscribedToNewsLetter']}
    sortOptions={['title', 'created', 'subscribedToNewsLetter']}
    icon={<Contact />}
    fields={ENTITY_FIELDS}
  >
    {props.children}
  </CMSEntityGrid >
);

EventsCMS.propTypes = contactsCMS;

export default EventsCMS;
