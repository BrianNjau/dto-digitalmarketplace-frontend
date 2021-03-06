import BuyerATMIntroductionStage from './BuyerATMIntroductionStage'
import BuyerATMAboutStage from './BuyerATMAboutStage'
import BuyerATMSelectStage from './BuyerATMSelectStage'
import BuyerATMObjectivesStage from './BuyerATMObjectivesStage'
import BuyerATMReviewStage from './BuyerATMReviewStage'
import BuyerATMAdditionalInformationStage, { done as additionalDone } from './BuyerATMAdditionalInformationStage'
import BuyerATMResponseFormatsStage from './BuyerATMResponseFormatsStage'
import BuyerATMTimeframesAndBudgetStage from './BuyerATMTimeframesAndBudgetStage'
import BuyerATMEvaluationCriteriaStage, {
  weightingsAddUpTo100,
  noEmptyWeightings,
  noEmptyCriteria,
  noDuplicateCriteria
} from './BuyerATMEvaluationCriteriaStage'

const BuyerATMStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerATMIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'select',
    title: 'Who can respond?',
    component: BuyerATMSelectStage,
    isDone: formValues => formValues.openTo === 'all' || (formValues.openTo === 'category' && formValues.sellerCategory)
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerATMAboutStage,
    isDone: formValues =>
      formValues.title.length > 0 &&
      formValues.organisation.length > 0 &&
      formValues.summary.length > 0 &&
      formValues.location.length > 0
  },
  {
    slug: 'criteria',
    title: 'Response criteria',
    component: BuyerATMEvaluationCriteriaStage,
    isDone: formValues =>
      formValues.evaluationCriteria.length > 0 &&
      noEmptyCriteria(formValues) &&
      noEmptyWeightings(formValues) &&
      weightingsAddUpTo100(formValues) &&
      noDuplicateCriteria(formValues)
  },
  {
    slug: 'formats',
    title: 'Response formats',
    component: BuyerATMResponseFormatsStage,
    isDone: formValues => formValues.requestMoreInfo === 'no' || formValues.evaluationType.length > 0
  },
  {
    slug: 'objectives',
    title: 'Objectives',
    component: BuyerATMObjectivesStage,
    isDone: formValues =>
      formValues.backgroundInformation.length > 0 &&
      formValues.outcome.length > 0 &&
      formValues.endUsers.length > 0 &&
      formValues.workAlreadyDone.length > 0
  },
  {
    slug: 'timeframes',
    title: 'Timeframes',
    component: BuyerATMTimeframesAndBudgetStage,
    isDone: formValues => formValues.startDate.length > 0
  },
  {
    slug: 'additional',
    title: 'Additional information',
    component: BuyerATMAdditionalInformationStage,
    isDone: additionalDone
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerATMReviewStage
  }
]

export default BuyerATMStages
