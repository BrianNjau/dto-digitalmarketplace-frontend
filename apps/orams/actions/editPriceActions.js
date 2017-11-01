/* eslint-disable */
import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  SET_EDIT_SERVICE_DATA,
  SET_PRICES_DATA,
  SET_STEP,
  SET_PRICE_TO_EDIT_DATA,
  SET_SERVICE_TO_EDIT_IN_STATE,
  SET_PRICE_TO_EDIT_ID,
  SET_ONE_PRICE,
  SET_BUTTON_CLICK,
  SET_SUPPLIER,
  SET_SUCCESS_MESSAGE,
  RESTART_EDIT_PRICING
} from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export function setServiceEditData(editServiceData) {
  return { type: SET_EDIT_SERVICE_DATA, editServiceData }
}

export function setPricesData(pricesData) {
  return { type: SET_PRICES_DATA, pricesData }
}

export function setStep(step) {
  return { type: SET_STEP, step }
}

export function setPriceToEdit(priceData) {
  return { type: SET_PRICE_TO_EDIT_DATA, priceData }
}

export function setServiceToEditInState(serviceToEdit) {
  return { type: SET_SERVICE_TO_EDIT_IN_STATE, serviceToEdit }
}

export function setPriceToEditId(priceId) {
  return { type: SET_PRICE_TO_EDIT_ID, priceId }
}

export function setOnePrice(priceObj) {
  return { type: SET_ONE_PRICE, priceObj }
}

export function setButtonClick(value) {
  return { type: SET_BUTTON_CLICK, value}
}

export function setSupplierData(supplier) {
  return {type: SET_SUPPLIER, supplier}
}

export function setSuccessMessage(successMessage) {
  return {type: SET_SUCCESS_MESSAGE, successMessage}
}

export function restartEditPricing() {
  return {type: RESTART_EDIT_PRICING}
}

export const setPrice = priceToEditData => dispatch => {
  dispatch(setPriceToEditId(priceToEditData.id))
  dispatch(setPriceToEdit(priceToEditData))
  dispatch(setStep(3))
}

export const loadServiceEditData = () => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(setSuccessMessage(false))
  dmapi({ url: '/supplier/services' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setServiceEditData(response.data))
      dispatch(setSupplierData(response.data.supplier))
      dispatch(setStep(1))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadPricesData = (serviceTypeId, categoryId, serviceName, subCategoryName) => dispatch => {
  dispatch(sendingRequest(true))

  const serviceToEdit = {
    serviceTypeId: serviceTypeId,
    categoryId: categoryId,
    serviceName: serviceName,
    subCategoryName: subCategoryName
  }

  dispatch(setServiceToEditInState(serviceToEdit))

  const baseUrl = '/supplier/services/' + serviceTypeId + '/categories/' + categoryId + '/prices'

  dmapi({ url: baseUrl }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setPricesData(response.data))
      dispatch(setStep(2))
    }
    dispatch(sendingRequest(false))
  })
}

export function setUserPrice(price, capPrice) {
  return (dispatch, getState) => {
    const state = getState()
    const priceObj = {
      capPrice: capPrice,
      regionState: state.editPricing.priceData.region.state,
      regionName: state.editPricing.priceData.region.name,
      id: state.editPricing.priceId,
      price: parseInt(price.price),
      startDate: price.date === 'custom' ? price.start_date : price.date,
      endDate: price.end_date ? price.end_date : ''
    }

    dispatch(setOnePrice(priceObj))

    if (state.editPricing.buttonClickValue === 'saveAnother') {
      dispatch(loadPricesData(
        state.editPricing.serviceToEdit.serviceTypeId,
        state.editPricing.serviceToEdit.categoryId,
        state.editPricing.serviceToEdit.serviceName,
        state.editPricing.serviceToEdit.subCategoryName ? state.editPricing.serviceToEdit.subCategoryName : ''))
    }

    if (state.editPricing.buttonClickValue === 'continueToFinalStep') {
      dispatch(setStep(4))
    }
  }
}

export function updatePrice() {
  return (dispatch, getState) => {
    const state = getState()

    const price = {
      prices: state.editPricing.pricesArray
    }

    dispatch(sendingRequest(true))

    dmapi({
      method: 'post',
      url: '/supplier/prices',
      data: JSON.stringify(price)
    }).then(response => {
      if (response.error) {
        dispatch(setErrorMessage(GENERAL_ERROR))
      } else {
        dispatch(setSuccessMessage(true))
        dispatch(restartEditPricing())
        dispatch(setStep(1))
        window.scrollTo(0, 0)
      }
      dispatch(sendingRequest(false))
    })

  }
}
