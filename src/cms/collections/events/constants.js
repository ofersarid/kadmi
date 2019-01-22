export const ENTITY_FIELDS = [{
  key: 'title',
  label: 'Title',
  type: 'single-line',
  required: true,
  min: 1,
  max: 40,
  initialValue: 'My Event',
}, {
  key: 'description',
  label: 'Description',
  type: 'multi-line',
  required: true,
  min: 1,
  max: 250,
  initialValue: 'My Description',
}, {
  key: 'pic',
  label: 'Picture',
  type: 'image',
  required: true,
}, {
  key: 'post',
  label: 'Post',
  type: 'post',
  required: true,
  min: 1,
}, {
  key: 'active',
  label: 'Activate',
  type: 'switch',
  initialValue: false,
}];
