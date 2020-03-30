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

    <AUheading level="2" size="lg">
      Maximum daily rate
    </AUheading>
    {/* <p>${props.meta.evidence.maxDailyRate} (including GST)</p> */}
    <AUheading level="2" size="lg">
      Evidence
    </AUheading>

    {props.evidence.criteria && props.evidence.criteria.map(criteriaId => (
      <React.Fragment key={criteriaId}>
        <AUheading level="2" size="md">
          Criteria
        </AUheading>
        <AUheading level="2" size="md">
          Client
        </AUheading>
        </React.Fragment>
    ))}
    }
  </div>
)
// const domain = this.props.meta.domain
//     const criteriaNeeded = getCriteriaNeeded(
//       domain.criteriaNeeded,
//       domain.priceMaximum,
//       this.props[this.props.model].maxDailyRate
//     )

SellerAssessmentView.propTypes = {
  meta: PropTypes.object.isRequired,
  evidence: PropTypes.object.isRequired
}

export default SellerAssessmentView
