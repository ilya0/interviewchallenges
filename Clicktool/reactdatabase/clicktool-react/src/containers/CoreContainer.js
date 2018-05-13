import { connect } from 'react-redux'
import CoreLayout from 'layouts/CoreLayout'

const mapStateToProps = (state) => {
  return {
    path: state.location,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
