import { validateEmail } from '/src/cms/utils';

export const ENTITY_FIELDS = [{
  key: 'title',
  label: 'Name',
  type: 'single-line',
  required: true,
  min: 1,
  max: 40,
}, {
  key: 'email',
  label: 'Email',
  type: 'link',
  validateWith: validateEmail,
  required: true,
}, {
  key: 'created',
  label: 'Created',
  type: 'date-time',
  disabled: true,
  initialValue: new Date(),
}, {
  key: 'subscribedToNewsLetter',
  label: 'News Letter',
  type: 'switch',
  initialValue: false,
}];
