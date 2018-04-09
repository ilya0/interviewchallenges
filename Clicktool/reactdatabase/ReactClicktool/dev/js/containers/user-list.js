import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addUser, deleteUser} from '../actions/index'


class UserList extends Component {

    renderList() {
         const userRows = this.props.users.map((user,key) => {
            return (
                
                <tr>
                    <td key={user.id}>
                        {user.first} - {user.last}
                            -    <button type="button" onClick={() => this.props.deleteUser(key)}>Click Here to Remove Lander</button>
                    </td>
                </tr>
                
            );
        });
        return <table>{userRows}</table>
    }



    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return { users: state.users };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
