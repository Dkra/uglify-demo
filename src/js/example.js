import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import test from 'components/test/test'

const testContainer = connect(
  state => ({}),
  dispatch => bindActionCreators({}, dispatch)
)(test)

export default testContainer
h
