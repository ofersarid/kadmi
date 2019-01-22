import React from 'react';
import CMSEntityEditor from '/src/cms/cms-entity-grid/cms-entity-editor';
import { ENTITY_FIELDS } from '../constants';

const TeamMemberEditor = () => (
  <CMSEntityEditor
    route="cms/team"
    collection="team"
    editorFields={ENTITY_FIELDS}
  />
);

export default TeamMemberEditor;
