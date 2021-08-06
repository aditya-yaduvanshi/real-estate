import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Contact from './containers/Contact';
import About from './containers/About';
import Listings from './containers/Listings';
import ListingDetail from './containers/ListingDetail';
import Signup from './containers/Signup';
import Login from './containers/Login';
import NotFound from './components/NotFound';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import store from './store';
import './sass/main.scss';

const App = () => {
  return (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route exact path='/listings' component={Listings} />
          <PrivateRoute path='/listings/:id' component={ListingDetail} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
  );
}

export default App;
