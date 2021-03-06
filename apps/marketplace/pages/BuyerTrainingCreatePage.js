import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createTrainingBrief } from 'marketplace/actions/briefActions'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

export class BuyerTrainingCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      briefId: 0
    }
  }

  componentDidMount() {
    if (this.props.isPartOfTeam || !this.props.mustJoinTeam) {
      this.props.createTrainingBrief().then(response => {
        if (response.status === 200) {
          this.setState({
            briefId: parseInt(response.data.id, 10)
          })
        }
      })
    }
  }

  render() {
    const { isPartOfTeam, isTeamLead, mustJoinTeam, teams } = this.props

    if (!isPartOfTeam && mustJoinTeam) {
      return <Redirect to={`${rootPath}/team/join`} />
    }

    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts')) {
      return <Redirect to={`${rootPath}/request-access/create_drafts`} />
    }

    if (this.state.briefId) {
      return <Redirect to={`${rootPath}/brief/${this.state.briefId}/overview/training2`} />
    }

    return <LoadingIndicatorFullPage />
  }
}

BuyerTrainingCreatePage.defaultProps = {
  teams: {},
  isTeamLead: false,
  isPartOfTeam: false,
  mustJoinTeam: false
}

const mapStateToProps = state => ({
  csrfToken: state.app.csrfToken,
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam,
  mustJoinTeam: state.app.mustJoinTeam
})

const mapDispatchToProps = dispatch => ({
  createTrainingBrief: () => dispatch(createTrainingBrief())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerTrainingCreatePage)
