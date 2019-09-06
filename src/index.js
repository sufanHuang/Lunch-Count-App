import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';



ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/edit/:id' component={EditUser} />
            <Route path='/add' component={AddUser} />
        </div>
    </Router>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
