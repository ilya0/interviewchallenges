import { connect } from 'react-redux'
import ListView from '../components/ListView'
import { addUser, deleteUser } from 'store/users/'

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users.toJS()
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
  deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
