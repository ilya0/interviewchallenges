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

        <h2>Add new Landers</h2>
        <user-form />
        <hr />

    

        <h2>Lander Details</h2>
        <UserDetails />



    </div>
);

export default App;
