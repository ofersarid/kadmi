import React from 'react';
import CMSEntityGrid from '/src/cms/cms-entity-grid/cms-entity-grid';
import { Group } from 'styled-icons/boxicons-solid/Group';
import { eventsCMS } from '../types';
import { ENTITY_FIELDS } from '../constants';

const TeamCms = props => (
  <CMSEntityGrid
    route="/cms/team"
    collection="team"
    filters={['title', 'description']}
    sortOptions={['displayOrder', 'title', 'description']}
    icon={<Group />}
    fields={ENTITY_FIELDS}
  >
    {props.children}
  </CMSEntityGrid >
);

TeamCms.propTypes = eventsCMS;

export default TeamCms;
