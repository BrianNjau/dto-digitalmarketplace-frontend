import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import BuyerATMCompleted from 'marketplace/components/BuyerATM/BuyerATMCompleted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BuyerATMCompletedPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loadedAt: new Date().valueOf()
    }
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  getBriefData() {
    this.setState({
      loading: true
    })
    this.props.loadInitialData(this.props.match.params.briefId).then(() => {
      this.setState({
        loading: false,
        loadedAt: new Date().valueOf()
      })
    })
  }

  handleFeedbackSubmit(values) {
    this.props.handleFeedbackSubmit({
      timeToComplete: this.state.loadedAt ? new Date().valueOf() - this.state.loadedAt : null,
      object_id: this.props.match.params.briefId,
      object_type: 'Brief',
      userType: this.props.app.userType,
      ...values
    })
  }

  render() {
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    if (this.props.errorMessage) {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the brief details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.status && this.props.brief.status !== 'live') {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the brief details"
          errorMessage="This brief is not yet live"
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.props.brief && this.props.brief.closedAt) {
      return (
        <BuyerATMCompleted
          contactEmail={this.props.emailAddress}
          closingDate={this.props.brief.closedAt}
          app={this.props.app}
          handleFeedbackSubmit={this.handleFeedbackSubmit}
        />
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  app: state.app,
  brief: state.brief.brief,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId)),
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerATMCompletedPage)
