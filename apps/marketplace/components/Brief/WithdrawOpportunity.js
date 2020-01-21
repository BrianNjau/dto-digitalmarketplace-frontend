import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { required } from 'marketplace/components/validators'
import { rootPath } from 'marketplace/routes'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'

import styles from '../../main.scss'

export class WithdrawOpportunity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAuthorityToWithdraw: false,
      invalidAuthority: false,
      invalidReason: false
    }

    this.handleWithdrawButtonClick = this.handleWithdrawButtonClick.bind(this)
  }

  handleWithdrawButtonClick = () => {
    this.setState({
      invalidAuthority: false,
      invalidReason: false
    })

    this.props.resetFormValidity()
  }

  render = () => {
    const { brief, isOpenToAll, model, onSubmitFailed, onWithdrawOpportunity } = this.props
    const { hasAuthorityToWithdraw, invalidAuthority } = this.state

    const requiredReasonToWithdraw = formValues => {
      const validReason = required(formValues.reasonToWithdraw)
      if (!validReason) {
        this.setState({
          invalidReason: true
        })
      }

      return validReason
    }

    const requiredAuthorityToWithdraw = () => {
      const validAuthority = hasAuthorityToWithdraw === true
      if (!validAuthority) {
        this.setState({
          invalidAuthority: true
        })
      }

      return validAuthority
    }

    const requiredReasonMessage = <a href="#reasonToWithdraw">You must enter a reason for withdrawal</a>
    const requiredAuthorityMessage = (
      <a href="#authorityToWithdraw">Select the checkbox to confirm you have authority to withdraw this opportunity</a>
    )

    return (
      <Form
        model={model}
        onSubmit={onWithdrawOpportunity}
        onSubmitFailed={onSubmitFailed}
        validateOn="submit"
        validators={{
          '': {
            requiredReasonToWithdraw,
            requiredAuthorityToWithdraw
          }
        }}
      >
        <AUheading size="xl" level="1">
          Withdraw &apos;{brief.title}&apos; ({brief.id})
        </AUheading>
        <ErrorAlert
          model={model}
          messages={{
            requiredReasonToWithdraw: requiredReasonMessage,
            requiredAuthorityToWithdraw: requiredAuthorityMessage
          }}
        />
        <p>Once you select &apos;Withdraw opportunity&apos;:</p>
        <ul>
          {isOpenToAll ? (
            <li>we will notify sellers who have drafted or submitted responses to this opportunity</li>
          ) : (
            <li>we will notify all sellers that you invited</li>
          )}
          <li>the opportunity page will display your reason for withdrawal</li>
          <li>you will not be able to reopen the opportunity again</li>
        </ul>
        <div className={styles.marginTop2}>
          <Textarea
            controlProps={{
              limit: 25,
              rows: '2'
            }}
            description="The opportunity page will display your reason for withdrawal"
            id="reasonToWithdraw"
            label="Reason for withdrawal"
            key="reasonToWithdraw"
            messages={{
              required: `You must enter a withdrawal reason`
            }}
            model={`${model}.reasonToWithdraw`}
            name="reasonToWithdraw"
            validators={{ required }}
          />
        </div>
        <AUcheckbox
          checked={hasAuthorityToWithdraw}
          className={`${styles.marginTop2} ${invalidAuthority ? 'au-control-input--invalid' : ''}`}
          id="authorityToWithdraw"
          label="I have the authority to withdraw this opportunity and understand once I do so I will not be able to re-open it"
          name="authorityToWithdraw"
          onChange={() => {}}
          onClick={e => {
            this.setState({
              hasAuthorityToWithdraw: e.target.checked
            })
          }}
        />
        <div className={styles.marginTop2}>
          <AUbutton onClick={this.handleWithdrawButtonClick} type="submit">
            Withdraw opportunity
          </AUbutton>
          <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
            Cancel request
          </AUbutton>
        </div>
      </Form>
    )
  }
}

WithdrawOpportunity.defaultProps = {
  brief: {},
  isOpenToAll: false,
  model: '',
  onSubmitFailed: () => {},
  onWithdrawOpportunity: () => {}
}

WithdrawOpportunity.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lot: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  isOpenToAll: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  onSubmitFailed: PropTypes.func,
  onWithdrawOpportunity: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  resetFormValidity: () => dispatch(actions.resetValidity(props.model))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawOpportunity)
