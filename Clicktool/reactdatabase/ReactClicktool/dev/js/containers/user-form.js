import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class UserForm extends Component {
    render() {
        if (!this.props.user) {
            return (<div>Select a user...</div>);
        }
        return (
            <div>
                <form>
              
                    <label>
                        Id:<input type="text" name="name" /> 
                        Name:<input type="text" name="name" />
                        URL:<input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            
        );
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

export default connect(mapStateToProps)(UserDetail);
