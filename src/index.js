import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './index.css';

// import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import Main from './views/Main';
import NotFound from './views/NotFound';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
