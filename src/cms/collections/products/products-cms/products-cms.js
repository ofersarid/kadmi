import React from 'react';
import CMSEntityGrid from '/src/cms/cms-entity-grid/cms-entity-grid';
import { productsCMS } from '../types';
import { Event } from 'styled-icons/material/Event';
import { ENTITY_FIELDS } from '../constants';

const ProductsCms = props => (
  <CMSEntityGrid
    route="/cms/products"
    collection="products"
    filters={['title', 'tagLine']}
    sortOptions={['title', 'displayOrder']}
    icon={<Event />}
    fields={ENTITY_FIELDS}
  >
    {props.children}
  </CMSEntityGrid >
);

ProductsCms.propTypes = productsCMS;

export default ProductsCms;
