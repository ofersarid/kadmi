export const collections = state => {
  const settings = state.get('fireStore').data.settings;
  return settings ? settings.collections : {};
};
