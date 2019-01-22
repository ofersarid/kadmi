import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import { MainContainer } from '/src/cms/app';
import { HomePage } from '/src/website/home';
import About from '/src/website/about';
import LoginPage from '/src/cms/auth/components/login-page/login-page';
import { EventsCMS, EventEditor } from '/src/cms/collections/events';
import { TeamCMS, TeamMemberEditor } from '/src/cms/collections/team';
import { ContactsCMS, ContactEditor } from '/src/cms/collections/contacts';
import { ProductsCMS, ProductEditor } from '/src/cms/collections/products';
import { ContactUs } from '/src/website/contact-us';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';

export default (
  <Route path="/" component={ReduxRoutes} >
    <IndexRedirect to="home" />
    <Route path="home" component={HomePage} />
    <Route path="about" component={About} />
    <Route path="contact" component={ContactUs} />
    <Route path="cms" component={MainContainer} >
      <Route path="events" component={EventsCMS} >
        <Route path="edit/:id" component={EventEditor} />
        <Route path="add" component={EventEditor} />
      </Route >
      <Route path="team" component={TeamCMS} >
        <Route path="edit/:id" component={TeamMemberEditor} />
        <Route path="add" component={TeamMemberEditor} />
      </Route >
      <Route path="contacts" component={ContactsCMS} >
        <Route path="edit/:id" component={ContactEditor} />
        <Route path="add" component={ContactEditor} />
      </Route >
      <Route path="products" component={ProductsCMS} >
        <Route path="edit/:id" component={ProductEditor} />
        <Route path="add" component={ProductEditor} />
      </Route >
    </Route >
    <Route path="login" component={LoginPage} />
    <Redirect from="*" to="/home" />
  </Route >
);
