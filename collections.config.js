import React from 'react';
import { Contact } from 'styled-icons/boxicons-solid/Contact';
import { Nature } from 'styled-icons/material/Nature';
import { Home } from 'styled-icons/icomoon/Home';
import { DockTop } from 'styled-icons/boxicons-solid/DockTop';
import { DockBottom } from 'styled-icons/boxicons-solid/DockBottom';

export const CLIENT_ID = 'omerkadmi.co.il';

export const COLLECTIONS = [
  {
    id: 'contacts',
    name: 'Contacts',
    icon: <Contact />,
    filters: ['title'],
    sortOptions: ['title', 'created', 'subscribedToNewsLetter'],
    fields: [{
      key: 'title',
      label: 'Name',
      type: 'single-line',
      required: true,
      min: 1,
      max: 40,
    }, {
      key: 'phone',
      label: 'Phone',
      type: 'single-line',
      min: 10,
      max: 10,
      required: true,
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
    sortOptions: ['dateTime', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: true,
      min: 1,
      max: 40,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }],
  }, {
    id: 'decks',
    name: 'Decks',
    icon: <DockBottom />,
    filters: ['title', 'description'],
    sortOptions: ['dateTime', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: true,
      min: 1,
      max: 40,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }],
  }, {
    id: 'indoor',
    name: 'Indoors',
    icon: <Home />,
    filters: ['title', 'description'],
    sortOptions: ['dateTime', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: true,
      min: 1,
      max: 40,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }],
  }, {
    id: 'outdoors',
    name: 'Outdoors',
    icon: <Nature />,
    filters: ['title', 'description'],
    sortOptions: ['dateTime', 'title'],
    fields: [{
      key: 'title',
      label: 'Title',
      type: 'single-line',
      required: true,
      min: 1,
      max: 40,
    }, {
      key: 'description',
      label: 'Description',
      type: 'multi-line',
    }, {
      key: 'pic',
      label: 'Picture',
      type: 'image',
      required: true,
    }, {
      key: 'active',
      label: 'Activate',
      type: 'switch',
      initialValue: false,
    }],
  }
];
