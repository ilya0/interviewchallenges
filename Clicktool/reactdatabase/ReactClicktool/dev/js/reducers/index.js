import {combineReducers} from 'redux'; //imports teh combine reducers function
import UserReducer from './reducer-users'; //import the files
import ActiveUserReducer from './reducer-active-user'; //import the file
import DeactiveUserReducer from './reducer-deactive-user'; //import the file

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    deactiveUser: DeactiveUserReducer
});

export default allReducers
