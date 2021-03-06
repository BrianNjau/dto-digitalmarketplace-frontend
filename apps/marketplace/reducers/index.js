/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import appReducer from './appReducer'
import brief from './briefReducers'
import user from './memberInfoReducers'
import domain from './domainReducers'
import evidence from './evidenceReducers'
import dashboard from './dashboardReducers'
import sellerDashboard from './sellerDashboardReducers'
import sellerEdit from './sellerEditReducers'
import opportunities from './opportunitiesReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'
import messages from './messagesReducers'
import team from './teamReducers'
import teamsDashboard from './teamsDashboardReducers'

export const SellerAssessmentFormReducer = {
  id: 0,
  domainId: 0,
  maxDailyRate: 0,
  criteria: [],
  evidence: {},
  created_at: null
}

export const SellerAssessmentEvidenceReducer = {
  client: '',
  refereeName: '',
  refereeNumber: '',
  startDate: '',
  endDate: '',
  background: '',
  response: '',
  sameAsFirst: true
}

export const BuyerRFXFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  internalReference: '',
  sellerCategory: '',
  sellers: {},
  attachments: [],
  requirementsDocument: [],
  responseTemplate: [],
  evaluationType: [],
  proposalType: [],
  includeWeightingsEssential: true,
  essentialRequirements: [{ criteria: '', weighting: '' }],
  includeWeightingsNiceToHave: false,
  niceToHaveRequirements: [{ criteria: '', weighting: '' }],
  includeWeightings: true,
  closedAt: '',
  contactNumber: '',
  startDate: '',
  contractLength: '',
  contractExtensions: '',
  budgetRange: '',
  workingArrangements: '',
  securityClearance: '',
  comprehensiveTerms: false
}

export const BuyerTrainingFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  sellerCategory: '',
  sellers: {},
  attachments: [],
  requirementsDocument: [],
  responseTemplate: [],
  evaluationType: [],
  proposalType: [],
  includeWeightingsEssential: true,
  essentialRequirements: [{ criteria: '', weighting: '' }],
  includeWeightingsNiceToHave: false,
  niceToHaveRequirements: [{ criteria: '', weighting: '' }],
  includeWeightings: true,
  closedAt: '',
  contactNumber: '',
  startDate: '',
  contractLength: '',
  contractExtensions: '',
  budgetRange: '',
  workingArrangements: '',
  securityClearance: '',
  comprehensiveTerms: false
}

export const BuyerATMFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  location: [],
  summary: '',
  industryBriefing: '',
  internalReference: '',
  sellerCategory: '',
  attachments: [],
  requestMoreInfo: '',
  evaluationType: [],
  evaluationCriteria: [{ criteria: '', weighting: '' }],
  includeWeightings: false,
  closedAt: '',
  startDate: '',
  openTo: '',
  workAlreadyDone: '',
  endUsers: '',
  backgroundInformation: '',
  outcome: '',
  timeframeConstraints: '',
  contactNumber: ''
}

export const BuyerSpecialistFormReducer = {
  id: 0,
  title: '',
  organisation: '',
  summary: '',
  location: [],
  attachments: [],
  contactNumber: '',
  internalReference: '',
  includeWeightingsEssential: false,
  essentialRequirements: [{ criteria: '', weighting: '' }],
  includeWeightingsNiceToHave: false,
  niceToHaveRequirements: [{ criteria: '', weighting: '' }],
  numberOfSuppliers: '3',
  evaluationType: ['Responses to selection criteria', 'Résumés'],
  preferredFormatForRates: 'dailyRate',
  maxRate: '',
  budgetRange: '',
  securityClearance: '',
  securityClearanceObtain: '',
  securityClearanceCurrent: '',
  securityClearanceOther: '',
  sellerCategory: '',
  openTo: '',
  sellers: {},
  startDate: '',
  contractLength: '',
  contractExtensions: '',
  closedAt: '',
  comprehensiveTerms: false
}

export const BriefResponseSpecialistReducer = {
  submit: false,
  resume: [],
  attachedDocumentURL: [],
  availability: '',
  specialistName: '',
  specialistGivenNames: '',
  specialistSurname: '',
  dayRate: '',
  dayRateExcludingGST: '',
  hourRate: '',
  hourRateExcludingGST: '',
  essentialRequirements: {},
  niceToHaveRequirements: {},
  respondToEmailAddress: '',
  visaStatus: '',
  securityClearance: '',
  previouslyWorked: ''
}

export const BriefResponseRFXReducer = {
  submit: false,
  responseTemplate: [],
  writtenProposal: [],
  attachedDocumentURL: [],
  respondToEmailAddress: '',
  respondToPhone: ''
}

export const BriefResponseATMReducer = {
  submit: false,
  availability: '',
  criteria: {},
  writtenProposal: [],
  attachedDocumentURL: [],
  respondToEmailAddress: '',
  respondToPhone: ''
}

export const SellerEditFormReducer = {
  supplier: {
    name: '',
    code: '',
    data: {
      representative: '',
      email: '',
      phone: ''
    }
  },
  agreementStatus: {
    show: false,
    canSign: false,
    canUserSign: false,
    signed: false
  }
}

export default combineReducers({
  app: appReducer,
  user,
  brief,
  dashboard,
  domain,
  evidence,
  sellerDashboard,
  sellerEdit,
  opportunities,
  messages,
  form_options,
  errorMessage,
  teamsDashboard,
  ...createForms({
    askAQuestionForm: {
      question: ''
    },
    publishAQuestionForm: {
      question: '',
      answer: ''
    },
    signupForm: {
      name: '',
      email_address: '',
      abn: ''
    },
    createUserForm: {
      name: '',
      password: ''
    },
    briefAwardSeller: {
      awardedSupplierCode: ''
    },
    briefResponseForm: BriefResponseSpecialistReducer,
    downloadReports: {
      startDate: '',
      endDate: '',
      reportType: 'sellersCatalogue'
    },
    resetPasswordEmailForm: {
      email_address: '',
      password: '',
      confirmPassword: ''
    },
    resetPasswordForm: {
      password: '',
      confirmPassword: ''
    },
    loginForm: {
      emailAddress: '',
      password: ''
    },
    briefInviteAssessorsForm: {
      email_address: ''
    },
    opportunitiesFilterForm: {
      status: {
        live: false,
        closed: false
      },
      openTo: {
        all: false
      },
      type: {
        outcomes: false,
        specialists: false,
        atm: false,
        training: false
      },
      location: {
        ACT: false,
        NSW: false,
        NT: false,
        QLD: false,
        SA: false,
        TAS: false,
        VIC: false,
        WA: false,
        Remote: false
      }
    },
    closeOpportunityForm: {},
    editOpportunityForm: {
      closingDate: '',
      onlySellersEdited: true,
      documentsEdited: false,
      sellers: {},
      attachments: [],
      requirementsDocument: [],
      responseTemplate: [],
      summary: '',
      title: ''
    },
    withdrawOpportunityForm: {
      hasAuthorityToWithdraw: false,
      reasonToWithdraw: ''
    },
    BuyerRFXForm: BuyerRFXFormReducer,
    BuyerTrainingForm: BuyerTrainingFormReducer,
    BuyerATMForm: BuyerATMFormReducer,
    SellerAssessmentForm: SellerAssessmentFormReducer,
    BuyerSpecialistForm: BuyerSpecialistFormReducer,
    SellerEditFlowPage: SellerEditFormReducer,
    team
  })
})
