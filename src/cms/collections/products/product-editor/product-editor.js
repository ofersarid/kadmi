import React from 'react';
import CMSEntityEditor from '/src/cms/cms-entity-grid/cms-entity-editor';
import { ENTITY_FIELDS } from '../constants';

const ProductEditor = () => (
  <CMSEntityEditor
    route="cms/products"
    collection="products"
    editorFields={ENTITY_FIELDS}
  />
);

export default ProductEditor;
