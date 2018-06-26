import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import formProps from 'shared/form/formPropsSelector'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefInviteAssessorsForm from 'marketplace/components/Brief/Assessors/BriefInviteAssessorsForm'
import { loadBriefAssessors, handleBriefAssessorSubmit } from 'marketplace/actions/briefActions'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { setErrorMessage } from 'marketplace/actions/appActions'

const MaxAssessors = 5

export class BriefAssessorsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const briefId = this.props.match.params.briefId
    this.props.loadInitialData(briefId)
    this.props.addAssessor(this.props.model)
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleSubmit = data => {
    const briefId = this.props.match.params.briefId
    this.props.handleBriefAssessorSubmit(briefId, data, this.props.assessors)
    window.scrollTo(0, 0)
  }

  render() {
    const { currentlySending, loadSuccess } = this.props
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (currentlySending) return <LoadingIndicatorFullPage />
    if (loadSuccess) {
      return (
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <BriefInviteAssessorsForm
            setFocus={setFocus}
            handleSubmit={this.handleSubmit}
            maxAssessors={MaxAssessors}
            submitClicked={this.onSubmitClicked}
            {...this.props}
          />
        </div>
      )
    }

    return (
      <AUpageAlert as="error">
        <h4>There was a problem loading the brief evaluators </h4>
      </AUpageAlert>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'briefInviteAssessorsForm'),
  currentlySending: state.brief.currentlySending,
  assessors: state.brief.briefAssessors,
  submittedAssessors: state.brief.submittedBriefAssessors,
  loadSuccess: state.brief.loadBriefAssessorsSuccess,
  briefAssessorSubmitSuccess: state.brief.briefAssessorSubmitSuccess
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadBriefAssessors(briefId)),
  addAssessor: (model, count) => {
    if (count >= MaxAssessors) {
      dispatch(setErrorMessage('You cannot invite any more evaluators'))
    } else {
      dispatch(actions.push(`${model}.assessors`, { email_address: '', view_day_rates: false }))
    }
  },
  removeAssessor: (model, index) => dispatch(actions.remove(`${model}.assessors`, index)),
  handleBriefAssessorSubmit: (briefId, data, assessors) => {
    dispatch(handleBriefAssessorSubmit(briefId, data, assessors))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BriefAssessorsPage))
