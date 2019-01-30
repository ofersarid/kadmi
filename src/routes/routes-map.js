import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import { MainContainer } from '/src/cms/app';
import { Home } from '/src/website/home';
import { GeneralAssets } from '/src/cms/collections';
import LoginPage from '/src/cms/auth/components/login-page/login-page';
import { WebsiteMainContainer } from '/src/website/app';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import { COLLECTIONS, GENERAL_ASSETS } from '/collections.config';
import { Gallery } from '/src/website/gallery';
import CollectionContainer from '/src/cms/collections/components/collection-container/collection-container';

export default (
  <Route path="/" component={ReduxRoutes} >
    <IndexRedirect to="website/home" />
    <Route path="cms" component={MainContainer} >
      {COLLECTIONS.map(col => (
        <Route
          path={col.id}
          component={() => <CollectionContainer {...col} />}
          key={col.id}
        >
          <Route path="edit/:id" />
          <Route path="add" />
        </Route >
      ))}
      {GENERAL_ASSETS.length && <Route path="general-assets" component={GeneralAssets} />}
    </Route >
    <Route path="login" component={LoginPage} />
    <Route path="website" component={WebsiteMainContainer} >
      <IndexRedirect to="home" />
      <Route path="home" component={Home} />
      <Route path="pergolas" component={() => <Gallery collection="pergolas" />} />
      <Route path="decks" component={() => <Gallery collection="decks" />} />
      <Route path="indoors" component={() => <Gallery collection="indoors" />} />
      <Route path="outdoors" component={() => <Gallery collection="outdoors" />} />
      <Route path="renewals" component={() => <Gallery collection="renewals" />} />
    </Route >
    <Redirect from="*" to="/website/home" />
  </Route >
);
