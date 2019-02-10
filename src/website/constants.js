import React from 'react';
import { Nature } from 'styled-icons/material/Nature';
import { Home } from 'styled-icons/icomoon/Home';
import { DockTop } from 'styled-icons/boxicons-solid/DockTop';
import { DockBottom } from 'styled-icons/boxicons-solid/DockBottom';
import { MagicWand } from 'styled-icons/boxicons-solid/MagicWand';

export const CATEGORIES = [{
  label: 'דקים',
  route: '/website/decks',
  icon: <DockBottom />,
}, {
  label: 'פרגולות',
  route: '/website/pergolas',
  icon: <DockTop />,
}, {
  label: 'חוץ',
  route: '/website/outdoors',
  icon: <Nature />,
}, {
  label: 'פנים',
  route: '/website/indoors',
  icon: <Home />,
}, {
  label: 'חידוש',
  route: '/website/renewals',
  icon: <MagicWand />,
}];
