import { RESET_PASSWORD_EMAIL_SUCCESS, RESET_PASSWORD_SUCCESS } from '../constants/constants'

import { UNABLE_TO_RESET, UNABLE_TO_SEND } from '../constants/messageConstants'

import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleResetPasswordSuccess = () => ({ type: RESET_PASSWORD_EMAIL_SUCCESS })

export const sendResetPasswordEmail = values => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/reset-password`,
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(values)
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(UNABLE_TO_SEND))
    } else {
      dispatch(handleResetPasswordSuccess())
    }
    dispatch(sendingRequest(false))
  })
}

export const handleSubmitResetPasswordSuccess = response => ({
  type: RESET_PASSWORD_SUCCESS,
  user: response.data
})

export const submitResetPassword = (token, emailAddress, values) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/reset-password/${token}`,
    params: { e: encodeURIComponent(emailAddress) },
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(values)
  }).then(response => {
    if (response.error) {
      if (response.data && response.data.message) {
        dispatch(setErrorMessage(response.data.message))
      } else {
        dispatch(setErrorMessage(UNABLE_TO_RESET))
      }
    } else {
      dispatch(handleSubmitResetPasswordSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
