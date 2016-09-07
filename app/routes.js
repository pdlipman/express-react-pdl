import React from 'react';
import App from './components/App';
import Top from './components/Top';
import {
  Route,
  DefaultRoute,
} from 'react-router';

const Link = 'react-router'.Link;

export default (
    <Route name="top" handler={App} path="/">
      <DefaultRoute handler={Top} />
    </Route>
);
