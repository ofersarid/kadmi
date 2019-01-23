import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import { MainContainer } from '/src/cms/app';
import { HomePage } from '/src/website/home';
import About from '/src/website/about';
import LoginPage from '/src/cms/auth/components/login-page/login-page';
import { ContactUs } from '/src/website/contact-us';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import { COLLECTIONS } from '/collections.config';
import CollectionContainer from '/src/cms/collections/components/collection-container/collection-container';

export default (
  <Route path="/" component={ReduxRoutes} >
    <IndexRedirect to="home" />
    <Route path="home" component={HomePage} />
    <Route path="about" component={About} />
    <Route path="contact" component={ContactUs} />
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
    </Route >
    <Route path="login" component={LoginPage} />
    <Redirect from="*" to="/home" />
  </Route >
);
