import React from 'react';
import { Contact } from 'styled-icons/boxicons-solid/Contact';
import { Nature } from 'styled-icons/material/Nature';
import { Home } from 'styled-icons/icomoon/Home';
import { DockTop } from 'styled-icons/boxicons-solid/DockTop';
import { DockBottom } from 'styled-icons/boxicons-solid/DockBottom';
import { MagicWand } from 'styled-icons/boxicons-solid/MagicWand';
import { validateEmail, imageTransformer, exportToCsv } from '/src/cms/utils';

export const CLIENT_ID = 'omerkadmi.co.il';

export const GENERAL_ASSETS = [{
  key: 'logo',
  label: 'Logo',
  type: 'image',
  transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
  required: true,
}, {
  key: 'pergolasCover',
  label: 'Pergolas Category Cover',
  type: 'image',
  transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
  required: true,
}, {
  key: 'decksCover',
  label: 'Decks Category Cover',
  type: 'image',
  transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
  required: true,
}, {
  key: 'outdoorsCover',
  label: 'Outdoors Category Cover',
  type: 'image',
  transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
  required: true,
}, {
  key: 'indoorsCover',
  label: 'Indoors Category Cover',
  type: 'image',
  transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
  required: true,
}, {
  key: 'renewalsCover',
  label: 'Renewals Category Cover',
  type: 'image',
  transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
  required: true,
}];

export const COLLECTIONS = [
  {
    id: 'contacts',
    name: 'Contacts',
    icon: <Contact />,
    filters: ['title'],
    sortOptions: ['title', 'created'],
    downloadCsv: list => {
      const data = list.reduce((reduced, item) => {
        const name = item.title.split(' ');
        reduced.push([item.email, name[0] || '', name[1] || '']);
        return reduced;
      }, [['Email Address', 'First Name', 'Last Name']]);
      exportToCsv('contacts', data);
    },
    fields: [{
      key: 'title',
      label: 'Name',
      type: 'single-line',
      required: true,
      min: 1,
      max: 100,
    }, {
      key: 'phone',
      label: 'Phone',
      type: 'single-line',
      min: 9,
      max: 11,
      required: true,
    }, {
      key: 'email',
      label: 'Email',
      type: 'single-line',
      required: true,
      validateWith: validateEmail,
    }, {
      key: 'created',
      label: 'Created',
      type: 'date-time',
      disabled: true,
      initialValue: new Date(),
    }],
  }, {
    id: 'pergolas',
    name: 'Pergolas',
    icon: <DockTop />,
    filters: ['title', 'description'],
    sortOptions: ['displayOrder', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: false,
      min: 1,
      max: 100,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }, {
      key: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
    }],
  }, {
    id: 'decks',
    name: 'Decks',
    icon: <DockBottom />,
    filters: ['title', 'description'],
    sortOptions: ['displayOrder', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: false,
      min: 1,
      max: 100,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }, {
      key: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
    }],
  }, {
    id: 'indoor',
    name: 'Indoors',
    icon: <Home />,
    filters: ['title', 'description'],
    sortOptions: ['displayOrder', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: false,
      min: 1,
      max: 100,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }, {
      key: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
    }],
  }, {
    id: 'outdoors',
    name: 'Outdoors',
    icon: <Nature />,
    filters: ['title', 'description'],
    sortOptions: ['displayOrder', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: false,
      min: 1,
      max: 100,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }, {
      key: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
    }],
  }, {
    id: 'renewals',
    name: 'Renewals',
    icon: <MagicWand />,
    filters: ['title', 'description'],
    sortOptions: ['displayOrder', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: false,
      min: 1,
      max: 100,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      transformer: imgFile => imageTransformer(imgFile, { maxSize: 1200 }),
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }, {
      key: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
    }],
  }
];
