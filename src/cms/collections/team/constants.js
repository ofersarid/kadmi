import { validateEmail } from '../../utils';

export const ENTITY_FIELDS = [{
  key: 'title',
  label: 'Name',
  type: 'single-line',
  required: true,
  min: 1,
  max: 40,
  initialValue: 'My Name',
}, {
  key: 'description',
  label: 'Description',
  type: 'multi-line',
  required: true,
  min: 1,
  max: 40,
  initialValue: 'About Me',
}, {
  key: 'pic',
  label: 'Picture',
  type: 'image',
  required: true,
}, {
  key: 'email',
  label: 'Email',
  type: 'link',
  required: true,
  validateWith: validateEmail,
}, {
  key: 'socialProfile',
  label: 'Social Profile',
  type: 'link',
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
}];
