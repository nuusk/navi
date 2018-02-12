import React from 'react';

//moduł zapewniający funkcje związane z DOM
import ReactDOM from 'react-dom';

//moduł pozwalający na routowanie po DOM przy użyciu elementów z biblioteki React
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

//widoki w aplikacji.
//każdy widok jest odpowiedzialny za renderowanie określonych komponentów
//main jest głównym widokiem, na którym znajdują się wszystkie funkcjonalności navi
import Main from './views/Main';

//jeśli nastąpiło niewłaściwe przekierowanie, czyli otrzymano status 404,
//następje wyświetlenie widoku NotFound, który informuje o błędzie
import NotFound from './views/NotFound';

//renderowanie komponentu i umieszczenie go w podanym kontenerze (w tym przypadku element 'root')
ReactDOM.render(
  //w zależności od podanej ścieżki, React przekierowuje na odpowiedni widok
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  //korzystając ze struktury DOM należy stosować się do narzuconej struktury drzewiastej
  document.getElementById('root'));
registerServiceWorker();
