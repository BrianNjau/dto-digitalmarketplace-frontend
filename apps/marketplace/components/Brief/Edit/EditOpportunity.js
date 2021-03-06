import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { rootPath } from 'marketplace/routes'
import EditOpportunityTable from './EditOpportunityTable'
import { hasEdits, itemWasEdited, documentsWasEdited } from './helpers'
import { isValid as documentsIsValid } from './EditOpportunityDocuments'

import styles from '../../../main.scss'

class EditOpportunity extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0)

    this.state = {
      hasErrors: false,
      showNoEditsAlert: false,
      showDocumentsErrorAlert: false,
      understandsEditProcess: false
    }

    this.showCheckBox = this.showCheckBox.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.validateDocuments = this.validateDocuments.bind(this)
    this.validateEditsHaveBeenMade = this.validateEditsHaveBeenMade.bind(this)
    this.validateEditProcessCheckBox = this.validateEditProcessCheckBox.bind(this)
  }

  handleSubmitClick = () => {
    const { showDocumentsErrorAlert, showNoEditsAlert } = this.state

    // Reset so the alerts can focus on subsequent submit events
    if (showNoEditsAlert) {
      this.setState({
        showNoEditsAlert: false
      })
    }

    if (showDocumentsErrorAlert) {
      this.setState({
        showDocumentsErrorAlert: false
      })
    }
  }

  showCheckBox = () => {
    const { brief, edits } = this.props
    return (
      itemWasEdited(brief.title, edits.title) ||
      documentsWasEdited(brief, edits) ||
      itemWasEdited(format(new Date(brief.dates.closing_time), 'YYYY-MM-DD'), edits.closingDate) ||
      itemWasEdited(brief.summary, edits.summary)
    )
  }

  validateDocuments = () => {
    const { brief, edits } = this.props
    const valid = edits.documentsEdited ? documentsIsValid(brief, edits) : true

    if (!valid) {
      this.setState({
        showDocumentsErrorAlert: true
      })
    }

    return valid
  }

  validateEditsHaveBeenMade = () => {
    const { brief, edits } = this.props
    const editsPending = hasEdits(brief, edits)

    if (!editsPending) {
      this.setState({
        showNoEditsAlert: true
      })
    }

    return editsPending
  }

  validateEditProcessCheckBox = () => {
    const { understandsEditProcess } = this.state
    const showCheckBox = this.showCheckBox()

    if (showCheckBox && !understandsEditProcess) {
      this.setState({
        hasErrors: true
      })
    }

    return showCheckBox ? understandsEditProcess : true
  }

  render = () => {
    const { brief, edits, isOpenToAll, location, model, onSubmitEdits } = this.props
    const { hasErrors, showNoEditsAlert, showDocumentsErrorAlert } = this.state
    const editsMadeValidator = this.validateEditsHaveBeenMade
    const documentsValidator = this.validateDocuments
    const checkBoxValidator = this.validateEditProcessCheckBox
    const showCheckBox = this.showCheckBox()

    const returnPath =
      location.state && Object.prototype.hasOwnProperty.call(location.state, 'from') && location.state.from
        ? location.state.from
        : `${rootPath}/brief/${brief.id}/overview/${brief.lot}`

    return (
      <div className="col-xs-12">
        <Form
          model={model}
          onSubmit={onSubmitEdits}
          onSubmitFailed={() => {}}
          validateOn="submit"
          validators={{
            '': {
              editsMadeValidator,
              documentsValidator,
              checkBoxValidator
            }
          }}
        >
          <div className="row">
            <AUheading level="1" size="xl">
              Edit live opportunity
            </AUheading>
            {showNoEditsAlert && (
              <ErrorAlert
                model={model}
                messages={{
                  editsMadeValidator: 'You have not made any changes to the opportunity.'
                }}
              />
            )}
            {showDocumentsErrorAlert && (
              <ErrorAlert
                model={model}
                messages={{
                  documentsValidator: (
                    <span>
                      You have errors in the <Link to="/documents">edit documents</Link> section.
                    </span>
                  )
                }}
              />
            )}
            <p className={styles.fontSizeMd}>
              If you&apos;re having issues making the changes you need, <a href="/contact-us">contact us</a>.
            </p>
          </div>
          <div className="row">
            <EditOpportunityTable brief={brief} edits={edits} isOpenToAll={isOpenToAll} location={location} />
          </div>
          {hasErrors && (
            <div className="row">
              <ErrorAlert
                model={model}
                messages={{
                  checkBoxValidator: (
                    <AUbutton
                      as="tertiary"
                      className={`${styles.border0} ${styles.padding0}`}
                      onClick={() => document.getElementById('understandsEditProcess').focus()}
                    >
                      {isOpenToAll
                        ? 'Select the checkbox to confirm you understand sellers will be able to view the history of your updates.'
                        : 'Select the checkbox to confirm you understand invited sellers can view the history of your updates.'}
                    </AUbutton>
                  )
                }}
              />
            </div>
          )}
          {showCheckBox && (
            <div className="row">
              <AUcheckbox
                className={`${styles.marginTop2} ${hasErrors ? 'au-control-input--invalid' : ''}`}
                id="understandsEditProcess"
                label={
                  isOpenToAll
                    ? 'I understand if I submit these changes, sellers will be able to view the history of my updates.'
                    : 'I understand if I submit these changes, invited sellers will be notified and can view the history of my updates.'
                }
                name="understandsEditProcess"
                onChange={() => {}}
                onClick={e => {
                  this.setState({
                    hasErrors: false,
                    understandsEditProcess: e.target.checked
                  })
                }}
              />
            </div>
          )}
          <div className={`row ${styles.marginTop2}`}>
            <AUbutton onClick={this.handleSubmitClick} type="submit">
              Submit changes
            </AUbutton>
            <AUbutton as="tertiary" link={returnPath}>
              Cancel all updates
            </AUbutton>
          </div>
        </Form>
      </div>
    )
  }
}

EditOpportunity.defaultProps = {
  brief: {
    dates: {
      closing_time: ''
    },
    summary: '',
    title: ''
  },
  edits: {
    closingDate: '',
    onlySellersEdited: true,
    sellers: {},
    summary: '',
    title: ''
  },
  isOpenToAll: true,
  location: {},
  model: '',
  onSubmitEdits: () => {}
}

EditOpportunity.propTypes = {
  brief: PropTypes.shape({
    dates: PropTypes.shape({
      closing_time: PropTypes.string.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    lot: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  edits: PropTypes.shape({
    closingDate: PropTypes.string.isRequired,
    onlySellersEdited: PropTypes.bool.isRequired,
    sellers: PropTypes.object.isRequired,
    summary: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  isOpenToAll: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired,
  onSubmitEdits: PropTypes.func.isRequired
}

export default EditOpportunity
