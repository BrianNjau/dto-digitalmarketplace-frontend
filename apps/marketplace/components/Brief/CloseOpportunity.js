import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import formProps from 'shared/form/formPropsSelector'

import styles from '../../main.scss'

export class CloseOpportunity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAuthorityToClose: false
    }

    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this)
  }

  handleCloseButtonClick = () => {
    this.setState({
      hasErrors: false
    })

    this.props.resetFormValidity()
  }

  render = () => {
    const { brief, model, onCloseOpportunity, onSubmitFailed } = this.props
    const { hasErrors } = this.state

    let seller = {
      name: ''
    }

    if (brief.sellers) {
      seller = Object.values(brief.sellers).pop()
    }

    const requiredAuthorityToClose = () => {
      const validAuthority = this.state.hasAuthorityToClose === true
      if (!validAuthority) {
        this.setState({
          hasErrors: true
        })
      }

      return validAuthority
    }

    return (
      <Form
        model={model}
        onSubmit={onCloseOpportunity}
        onSubmitFailed={onSubmitFailed}
        validateOn="submit"
        validators={{
          '': {
            requiredAuthorityToClose
          }
        }}
      >
        <AUheading size="xl" level="1">
          Close &apos;{brief.title}&apos; ({brief.id})
        </AUheading>
        <p>If you close this opportunity now:</p>
        <ul>
          <li>{seller.name} will no longer be able to edit their response</li>
          <li>
            you will be able to download{' '}
            {seller.name.toLowerCase().endsWith('s') ? `${seller.name}'` : `${seller.name}'s`} response straight away
          </li>
        </ul>
        <AUcheckbox
          checked={this.state.hasAuthorityToClose}
          className={`${styles.marginTop2} ${hasErrors ? 'au-control-input--invalid' : ''}`}
          id="authorityToClose"
          label="I have the authority to close this opportunity and understand once I do so I will be unable to re-open it"
          name="authorityToClose"
          onChange={() => {}}
          onClick={e => {
            this.setState({
              hasAuthorityToClose: e.target.checked
            })
          }}
        />
        <div className={styles.marginTop2}>
          <AUbutton onClick={this.handleCloseButtonClick} type="submit">
            Close opportunity
          </AUbutton>
          <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
            Cancel request
          </AUbutton>
        </div>
      </Form>
    )
  }
}

CloseOpportunity.defaultProps = {
  brief: {},
  onCloseOpportunity: () => {},
  onSubmitFailed: () => {}
}

CloseOpportunity.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lot: PropTypes.string.isRequired,
    sellers: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onCloseOpportunity: PropTypes.func.isRequired,
  onSubmitFailed: PropTypes.func
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
)(CloseOpportunity)
