import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import styles from './BuyerRFQReviewStage.scss'

const BuyerRFQReviewStage = props => (
  <div>
    <AUheading level="1" size="xl">
      Review and publish
    </AUheading>
    <p>If you send this brief today, you must be aware of the following dates:</p>
    <div className={styles.milestones}>
      <div className="row">
        <div className="col-xs-12 col-sm-4">Today</div>
        <div className="col-xs-12 col-sm-8">
          Invited sellers can ask questions about your requirements and apply for the brief.
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          {props[props.model].closedAt
            ? format(subDays(props[props.model].closedAt, 5), 'D MMMM')
            : `Five days before your closing date`}
        </div>
        <div className="col-xs-12 col-sm-8">The last day suppliers can ask questions.</div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          {props[props.model].closedAt
            ? format(subDays(props[props.model].closedAt, 1), 'D MMMM')
            : `One day before your closing date`}
        </div>
        <div className="col-xs-12 col-sm-8">The last day you can publish answers to all sellers&apos; questions.</div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          {props[props.model].closedAt ? format(props[props.model].closedAt, 'D MMMM') : `Your closing date`}
        </div>
        <div className="col-xs-12 col-sm-8">
          The last day sellers can apply and the brief closes at 6pm Canberra time.
        </div>
      </div>
    </div>
    <p>
      Once you press publish, your brief will be sent to the sellers you have invited. It will be visible on the Digital
      Marketplace.
    </p>
  </div>
)

BuyerRFQReviewStage.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQReviewStage)
