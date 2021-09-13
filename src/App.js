import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Favorite from './components/pages/Favorite';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/favorite' component={Favorite} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
