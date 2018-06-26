import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST,
  BRIEF_OVERVIEW_SUCCESS,
  DELETE_BRIEF_SUCCESS,
  BRIEF_ASSESSORS_FETCH_DATA_SUCCESS,
  BRIEF_SENDING_REQUEST,
  BRIEF_ASSESSOR_SUBMIT_SUCCESS
} from '../constants/constants'

const defaultBriefState = {
  loadBriefSuccess: null,
  briefSuccess: null,
  briefResponseSuccess: null,
  isDuplicate: null,
  brief: {},
  briefResponses: [],
  specialistName: '',
  specialistNumber: 1,
  addAnotherSpecialist: false,
  overview: {
    sections: [],
    status: '',
    title: ''
  },
  currentlySending: false,
  briefAssessors: [],
  loadBriefAssessorsSuccess: null,
  briefAssessorSubmitSuccess: null,
  briefAssessorDeleteSuccess: null,
  briefAssessorDeleteEmail: ''
}

const briefReducer = (state = defaultBriefState, action) => {
  switch (action.type) {
    case BRIEF_SENDING_REQUEST:
      return {
        ...state,
        currentlySending: action.currentlySending
      }
    case BRIEF_OVERVIEW_SUCCESS:
      return {
        ...state,
        loadBriefOverviewSuccess: true,
        loadBriefOverviewErrored: false,
        overview: action.data
      }
    case BRIEF_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        loadBriefSuccess: true,
        briefResponses: action.briefResponses,
        specialistNumber: action.briefResponses.length + 1,
        loadedAt: new Date().valueOf()
      }

    case BRIEF_RESPONSE_SUCCESS:
      return {
        ...state,
        briefResponseSuccess: true,
        briefResponses: [...state.briefResponses, action.briefResponse]
      }
    case DELETE_BRIEF_SUCCESS:
      return {
        ...state,
        deleteBriefSuccess: true,
        deleteBriefErrored: false
      }
    case SPECIALIST_NAME:
      return {
        ...state,
        specialistName: action.specialistName
      }

    case SPECIALIST_NUMBER:
      return {
        ...state,
        specialistNumber: action.specialistNumber + state.specialistNumber
      }

    case ADD_ANOTHER_SPECIALIST:
      return {
        ...state,
        addAnotherSpecialist: action.addAnotherSpecialist
      }

    case BRIEF_ASSESSORS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        briefAssessors: action.briefAssessors,
        loadBriefAssessorsSuccess: true,
        loadedAt: new Date().valueOf()
      }

    case BRIEF_ASSESSOR_SUBMIT_SUCCESS:
      return {
        ...state,
        briefAssessors: [...state.briefAssessors, ...action.briefAssessors],
        submittedBriefAssessors: action.briefAssessors,
        briefAssessorSubmitSuccess: true,
        loadedAt: new Date().valueOf()
      }

    default:
      return state
  }
}

export default briefReducer
