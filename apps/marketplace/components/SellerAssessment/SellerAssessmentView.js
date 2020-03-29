import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import { rootPath } from 'marketplace/routes'
import { connect } from 'react-redux'
import { getCriteriaName } from '../SellerAssessment/SellerAssessmentEvidenceStage'
import styles from './SellerAssessmentReviewStage.scss'

const SellerAssessmentView = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />

    <AUheading level="1" size="xl">
      {props.meta.domain.name} Assessment
    </AUheading>

    {props.meta.evidence.status === 'assessed' && (
      <p>
        You cannot edit your request for approved categories. If you want to change your rate, please contact the
        Digital Marketplace.
      </p>
    )}

    {props.meta.evidence.status === 'submitted' && (
      <p>
        You cannot edit your request once you&apos;ve submitted an request for assessment.
        <br />
        If you have an issue, <a href="/contact-us">contact our support team.</a>
      </p>
    )}

    {props.meta.evidence.status === 'rejected' && (
      <p>
        If your assessment is not approved, you can view the
        {/* <a href={`${rootPath}/seller-assessment/${props[props.model].id}/feedback/`}> feedback </a> */}
        and submit another request.
      </p>
    )}

    <AUheading level="2" size="lg">
      Maximum daily rate
    </AUheading>
    <p>${props.meta.evidence.maxDailyRate} (including GST)</p>
    <AUheading level="2" size="lg">
      Evidence
    </AUheading>
    {/* <p> {props.meta.domain.criteria[0]}</p> */}
    {/* <p> {props.meta.domain}</p> */}
    {/* {props.meta.domain.criteria.map(criteriaId => (
      <React.Fragment key={criteriaId}>
        <AUheading level="2" size="md">
          Criteria
        </AUheading>
        <AUheading level="2" size="md">
          Client
        </AUheading>
        </React.Fragment>
    ))} */}
  </div>
)
// const domain = this.props.meta.domain
//     const criteriaNeeded = getCriteriaNeeded(
//       domain.criteriaNeeded,
//       domain.priceMaximum,
//       this.props[this.props.model].maxDailyRate
//     )


SellerAssessmentView.propTypes = {
  meta: PropTypes.object.isRequired
}

export default SellerAssessmentView
