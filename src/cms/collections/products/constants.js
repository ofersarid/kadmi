export const ENTITY_FIELDS = [ {
  key: 'bannerColor',
  label: 'Banner Color',
  type: 'select',
  initialValue: 'blue',
  options: ['blue', 'red', 'green', 'yellow']
}, {
  key: 'title',
  label: 'Title',
  type: 'single-line',
  required: true,
  min: 1,
  max: 40,
  initialValue: 'My Title',
}, {
  key: 'tagLine',
  label: 'Tag-Line',
  type: 'single-line',
  required: true,
  min: 1,
  max: 40,
}, {
  key: 'nvp',
  label: 'NVP %',
  type: 'number',
  required: true,
  min: 1,
  max: 100,
  initialValue: 95,
}, {
  key: 'productImage',
  label: 'Product Image',
  type: 'image',
  required: true,
}, {
  key: 'testimonial-1-pic',
  label: 'Testimonial #1 Pic',
  type: 'image',
}, {
  key: 'testimonial-1-text',
  label: 'Testimonial #1 Text',
  type: 'single-line',
}, {
  key: 'testimonial-1-name',
  label: 'Testimonial #1 Name',
  type: 'single-line',
}, {
  key: 'video',
  label: 'Youtube Link',
  type: 'embed',
  transformer: value => value ? `https://www.youtube.com/embed/${value.split('/').pop().split('v=').pop()}` : '',
}, {
  key: 'article',
  label: 'PDF',
  type: 'downloadable',
}, {
  key: 'created',
  label: 'Created',
  type: 'date-time',
  disabled: true,
  initialValue: new Date(),
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
