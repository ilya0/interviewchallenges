import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
//import UserForm from '../containers/user-form';
//user form is not working
require('../../scss/style.scss');

const App = () => (
    <div>


        <h2>This is a clicktable</h2>
        <UserList />
        <hr />


    

        <h2>User Details</h2>
        <UserDetails />



    </div>
);

export default App;
