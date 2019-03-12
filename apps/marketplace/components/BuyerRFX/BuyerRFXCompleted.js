import React from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Feedback from 'marketplace/components/Feedback/Feedback'
import format from 'date-fns/format'

const BuyerRFXCompleted = props => (
  <div>
    <AUpageAlert as="success">
      <AUheading level="1" size="md">
        Your opportunity is now live, and the invited sellers have been notified.
      </AUheading>
      <p>It will be open until {format(props.closingDate, 'D MMMM, YYYY')} at 6pm Canberra time.</p>
    </AUpageAlert>
    <AUheading level="2" size="lg">
      What happens next?
    </AUheading>
    <ul>
      <li>
        While your opportunity is live, you&apos;ll need to{' '}
        <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000579716#live" rel="external">
          answer seller questions
        </a>.
      </li>
      <li>
        We will send an email to <strong>{props.contactEmail}</strong> when the opportunity closes, so you can download
        responses.
      </li>
    </ul>
    <p>
      If you need help at any time, <a href="/contact-us">contact us</a>.
    </p>
    <br />
    <Feedback
      app={props.app}
      handleSubmit={props.handleFeedbackSubmit}
      difficultyQuestion="How easy or difficult was it for you to publish this opportunity?"
      commentQuestion="How would you improve publishing an opportunity?"
      objectAction="responded_to"
    />
  </div>
)

BuyerRFXCompleted.defaultProps = {
  handleFeedbackSubmit: () => {}
}

BuyerRFXCompleted.propTypes = {
  closingDate: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  handleFeedbackSubmit: PropTypes.func
}

export default BuyerRFXCompleted
