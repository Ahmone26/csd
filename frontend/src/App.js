import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import CreateContact from './components/CreateContact';
import ListOfContacts from './components/ListOfContacts';
import EditContact from './components/EditContact';

import 'bootstrap/dist/css/bootstrap.min.css';


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        
        <Router>
            <div>
              <Navbar />    
                <div className='container'>
                <Route exact path='/login' component={ Login } />
                 <Route exact path='/' component={ Home } />
                  <Route exact path='/user' component={ Home } />  
                  <Route exact path='/createContact' component= { CreateContact } />
                  <Route exact path='/allContacts/:companyId' component= { ListOfContacts } />
                  <Route exact path='/:id/update' component= { EditContact } /> 
                </div>   
             </div>
        </Router>
         
      </Provider>
    );
  }
}

export default App;