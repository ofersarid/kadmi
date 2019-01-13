import ReactGA from 'react-ga';

ReactGA.initialize('UA-132363213-1');

const PRODUCTION = window.location.hostname === 'omerkadmi.co.il';
// const PRODUCTION = true;

export const trackPageView = () => {
  if (!PRODUCTION) return;
  ReactGA.pageview(window.location.hash);
};

export const trackClick = (category, action) => {
  if (!PRODUCTION) return;
  ReactGA.event({
    category,
    action,
  });
};
