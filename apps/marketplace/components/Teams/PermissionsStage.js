import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'

const PermissionsStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Permissions
    </AUheadings>
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(PermissionsStage)