import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBrief } from 'marketplace/actions/briefActions'
import isValid from 'date-fns/is_valid'
import isFuture from 'date-fns/is_future'
import subDays from 'date-fns/sub_days'
import { rootPath } from 'marketplace/routes'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import ClosedDate from 'shared/ClosedDate'
import styles from './BuyerRFQOverview.scss'

const GreenTick = () => <img className={styles.greenTick} src="/static/svg/green-tick.svg" alt="Success" />

const answerSellerQuestionsRender = (brief, isPublished, isPastQuestionsDeadline) => {
  if (!isPublished) {
    return <span>Answer seller questions</span>
  }

  if (isPublished && isPastQuestionsDeadline) {
    return (
      <span>
        <GreenTick />
        <span>Answer seller questions</span>
      </span>
    )
  }

  return (
    <a href={`/buyers/frameworks/digital-marketplace/requirements/rfx/${brief.id}/supplier-questions/answer-question`}>
      Answer seller questions
    </a>
  )
}

const downloadResponsesRender = (brief, isPublished, isClosed) => {
  if (isPublished && isClosed) {
    return <a href={`${rootPath}/brief/${brief.id}/download-responses`}>Download responses</a>
  }

  return <span>Download responses</span>
}

class BuyerRFQOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteAlert: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
  }

  handleDeleteBrief(id) {
    this.props.deleteBrief(id)
  }

  toggleDeleteAlert() {
    this.setState(prevState => ({
      showDeleteAlert: !prevState.showDeleteAlert
    }))
  }

  handleDeleteClick(e) {
    e.preventDefault()
    this.setState({
      showDeleteAlert: true
    })
  }

  render() {
    if (this.props.deleteBriefSuccess) {
      return <Redirect to={`${rootPath}/buyer-dashboard`} />
    }

    const { brief, briefResponses } = this.props

    if (brief && brief.id && brief.dates) {
      const isPublished = brief.dates.published_date && isValid(new Date(brief.dates.published_date))

      const isPastQuestionsDeadline =
        brief.dates.closing_time &&
        isValid(new Date(brief.dates.closing_time)) &&
        new Date().toLocaleString('en-US', { timeZone: 'UTC' }) >
          subDays(new Date(brief.dates.closing_time), 1).toLocaleString('en-US', { timeZone: 'UTC' })

      const isClosed =
        brief.dates.closing_time &&
        isValid(new Date(brief.dates.closing_time)) &&
        !isFuture(new Date(brief.dates.closing_time))

      const invitedSellers =
        brief.sellers && Object.keys(brief.sellers).length > 0 ? Object.keys(brief.sellers).length : 0

      const questionsAsked =
        brief.clarificationQuestions && brief.clarificationQuestions.length > 0
          ? brief.clarificationQuestions.length
          : 0

      const briefResponseCount = briefResponses && briefResponses.length > 0 ? briefResponses.length : 0

      return (
        <div>
          <div className={styles.header}>
            <AUheading size="xl" level="1">
              <small className={styles.briefTitle}>{brief.title || `New RFX request`}</small>
              Overview
            </AUheading>
            <div className={styles.headerMenu}>
              {isPublished &&
                !isClosed && (
                  <div className={styles.headerMenuClosingTime}>
                    Closing{' '}
                    <strong>
                      <ClosedDate countdown date={brief.dates.closing_time} />
                    </strong>
                  </div>
                )}
              <ul>
                <li>
                  {isPublished ? (
                    <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View live</a>
                  ) : (
                    <span>View live</span>
                  )}
                </li>
                {!isPublished && <li>Preview</li>}
                {!isPublished && (
                  <li>
                    <a href="#delete" onClick={this.handleDeleteClick} className={styles.headerMenuDelete}>
                      Delete
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {this.state.showDeleteAlert && (
            <div className={styles.deleteAlert}>
              <AUpageAlert as="warning">
                <p>Are you sure you want to delete this brief?</p>
                <AUbutton onClick={() => this.handleDeleteBrief(brief.id)}>Yes, delete brief</AUbutton>
                <AUbutton as="secondary" onClick={this.toggleDeleteAlert}>
                  Do not delete
                </AUbutton>
              </AUpageAlert>
            </div>
          )}
          <ul className={styles.overviewList}>
            <li>
              {isPublished ? (
                <span>
                  <GreenTick />Create and publish request
                  <div className={styles.stageStatus}>
                    {invitedSellers} seller{invitedSellers > 1 && `s`} invited
                  </div>
                </span>
              ) : (
                <span>
                  <a href={`${rootPath}/buyer-rfq/${brief.id}/introduction`}>Create and publish request</a>
                </span>
              )}
            </li>
            <li>
              {answerSellerQuestionsRender(brief, isPublished, isPastQuestionsDeadline)}
              {questionsAsked > 0 && (
                <div className={styles.stageStatus}>
                  {questionsAsked} question{questionsAsked > 1 && `s`} asked
                </div>
              )}
            </li>
            <li>
              {downloadResponsesRender(brief, isPublished, isClosed)}
              {briefResponseCount > 0 && (
                <div className={styles.stageStatus}>
                  {briefResponseCount} seller{briefResponseCount > 1 && `s`} responded
                </div>
              )}
            </li>
            <li>
              <span>Evaluate responses</span>
            </li>
            <li>
              <span>Award a contract</span>
            </li>
            <li>
              <span>Debrief sellers</span>
            </li>
          </ul>
        </div>
      )
    }
    return null
  }
}

BuyerRFQOverview.propTypes = {
  brief: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  deleteBriefSuccess: state.brief.deleteBriefSuccess
})

const mapDispatchToProps = dispatch => ({
  deleteBrief: briefId => dispatch(deleteBrief(briefId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQOverview)