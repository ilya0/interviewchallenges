import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
//import UserForm from '../containers/user-form';
//user form is not working
require('../../scss/style.scss');
import { Button } from 'react-bootstrap';





const App = () => (
    <div>


        <h2>Lander - CLicktable</h2>
        <UserList />
        <hr />
    </div>
);

export default App;
