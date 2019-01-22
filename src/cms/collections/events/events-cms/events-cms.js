import React from 'react';
import CMSEntityGrid from '/src/cms/cms-entity-grid/cms-entity-grid';
import { eventsCMS } from '../types';
import { Event } from 'styled-icons/material/Event';
import { ENTITY_FIELDS } from '../constants';

const EventsCMS = props => (
  <CMSEntityGrid
    route="/cms/events"
    collection="events"
    filters={['title', 'description']}
    sortOptions={['dateTime', 'title']}
    icon={<Event />}
    fields={ENTITY_FIELDS}
  >
    {props.children}
  </CMSEntityGrid >
);

EventsCMS.propTypes = eventsCMS;

export default EventsCMS;
