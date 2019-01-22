import React from 'react';
import CMSEntityEditor from '/src/cms/cms-entity-grid/cms-entity-editor';
import { ENTITY_FIELDS } from '../constants';

const EventEditor = () => (
  <CMSEntityEditor
    route="cms/events"
    collection="events"
    editorFields={ENTITY_FIELDS}
  />
);

export default EventEditor;
