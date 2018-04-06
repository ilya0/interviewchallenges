import { connect } from 'react-redux'
import ListView from '../components/ListView'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.get('list'),
    loading: state.items.get('loading')
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
