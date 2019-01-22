import React from 'react';
import CMSEntityEditor from '/src/cms/cms-entity-grid/cms-entity-editor';
import { ENTITY_FIELDS } from '../constants';

const ContactEditor = () => (
  <CMSEntityEditor
    route="cms/contacts"
    collection="contacts"
    editorFields={ENTITY_FIELDS}
  />
);

export default ContactEditor;
