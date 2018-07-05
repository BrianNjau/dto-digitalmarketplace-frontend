/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Control } from 'react-redux-form'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import Textfield from 'shared/form/Textfield'
import { required, validEmail } from 'shared/validators'
import ErrorBox from 'shared/form/ErrorBox'

import styles from './BriefInviteAssessorsForm.scss'

const BriefInviteAssessorsForm = ({
  model,
  assessors,
  setFocus,
  handleSubmit,
  submitClicked,
  briefInviteAssessorsForm,
  addAssessor,
  removeAssessor,
  briefAssessorSubmitSuccess,
  submittedAssessors,
  match,
  maxAssessors,
  history
}) => {
  if (briefAssessorSubmitSuccess) {
    return (
      <article role="main">
        <AUpageAlert as="success">
          <AUheading size="xl" level="1">
            Invitations sent
          </AUheading>
          <p>An evaluator invitation have been sent to:</p>
          <ul>{submittedAssessors.map(e => <li key={e.email_address}>{e.email_address}</li>)}</ul>
          <AUbutton
            as="tertiary"
            className={styles.returnButton}
            onClick={() => history.push(`/2/brief/${match.params.briefId}/overview`)}
          >
            Return to overview
          </AUbutton>
        </AUpageAlert>
      </article>
    )
  }

  if (assessors.length >= maxAssessors) {
    return (
      <AUpageAlert as="error">
        <AUheading size="xl" level="1">
          You cannot invite any more evaluators
        </AUheading>
      </AUpageAlert>
    )
  }

  return (
    <article role="main">
      <ErrorBox
        title="There was a problem inviting evaluators"
        model={model}
        setFocus={setFocus}
        submitClicked={submitClicked}
      />
      <AUheading size="xl" level="1">
        Invite evaluators
      </AUheading>
      <p className={styles.remainingCount}>{maxAssessors - assessors.length} invitations remaining</p>
      <Form
        model={model}
        id="briefResponse"
        onSubmit={data => handleSubmit(data)}
        validators={{
          assessors: values => {
            const emailAddresses = values && values.map(a => a.email_address) || []
            return !emailAddresses.some((e, index) => emailAddresses.indexOf(e) !== index)
          }
        }}
      >
        {briefInviteAssessorsForm.assessors.map((assessor, i) => (
          <div className={styles.assessorContainer} key={i}>
            <div className="row">
              <div className="col-md-10">
                <AUheading size="lg" level="2">
                  {`Evaluator ${i + 1}`}
                </AUheading>
              </div>
              <div className="col-md-2">
                {i > 0 && (
                  <AUbutton as="tertiary" className={styles.removeButton} onClick={() => removeAssessor(model, i)}>
                    Remove
                  </AUbutton>
                )}
              </div>
            </div>
            <Textfield
              model={`${model}.assessors.[${i}].email_address`}
              name={`email_address-${i}`}
              id={`email_address-${i}`}
              type="email"
              htmlFor={`email_address-${i}`}
              label="Email address"
              validators={{ required, validEmail }}
              messages={{
                required: `Evaluator ${i + 1} email is required`,
                validEmail: 'A validly formatted email is required.'
              }}
            />
            <span className="au-control-input au-control-input--full">
              <Control.checkbox
                model={`${model}.assessors.[${i}].view_day_rates`}
                id={`view_day_rates-${i}`}
                name={`view_day_rates-${i}`}
                value="no"
                mapProps={{
                  className: 'au-control-input__input'
                }}
              />
              <label className="au-control-input__text" htmlFor={`view_day_rates-${i}`}>
                Allow this evaluator to see the candidate’s day rates.
              </label>
            </span>
          </div>
        ))}
        <AUbutton
          as="secondary"
          className={styles.addButton}
          onClick={() => addAssessor(model, assessors.length + briefInviteAssessorsForm.assessors.length)}
        >
          Add another
        </AUbutton>
        <p>We will email your chosen evaluators requesting their input in the evaluation process.</p>
        <AUbutton type="submit" className={styles.submitButton} onClick={submitClicked}>
          Send invites
        </AUbutton>
      </Form>
    </article>
  )
}

BriefInviteAssessorsForm.defaultProps = {
  model: '',
  assessors: [],
  setFocus: null,
  handleSubmit: null,
  submitClicked: null,
  briefInviteAssessorsForm: { assessors: [] },
  addAssessor: null,
  removeAssessor: null,
  briefAssessorSubmitSuccess: false,
  submittedAssessors: [],
  match: {},
  maxAssessors: 5,
  history: {}
}

BriefInviteAssessorsForm.propTypes = {
  model: PropTypes.string.isRequired,
  assessors: PropTypes.array.isRequired,
  setFocus: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitClicked: PropTypes.func,
  briefInviteAssessorsForm: PropTypes.object,
  addAssessor: PropTypes.func,
  removeAssessor: PropTypes.func,
  briefAssessorSubmitSuccess: PropTypes.bool,
  submittedAssessors: PropTypes.array,
  match: PropTypes.object,
  maxAssessors: PropTypes.number,
  history: PropTypes.object
}

export default BriefInviteAssessorsForm
