/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'

import PageAlert from '@gov.au/page-alerts'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BaseForm from 'shared/form/BaseForm'
import Layout from 'shared/Layout'
import ServiceEditList from 'orams/components/ServiceEditList/ServiceEditList'
import PricingList from 'orams/components/PricingList/PricingList'
import EditPriceForm from 'orams/components/EditPriceForm/EditPriceForm'
import { loadServiceEditData, loadPricesData, setStep, setPrice } from 'orams/actions/editPriceActions'

import styles from './PricingDetailsForm.scss'

class PricingDetailsForm extends BaseForm {
  static propTypes = {}

  componentDidMount() {
    this.props.loadServiceEdit()
  }

  loadStepTwo = (serviceTypeId, categoryId, serviceName, subCategoryName) => {
    this.props.loadPrices(serviceTypeId, categoryId, serviceName, subCategoryName)
  }

  mainSection() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.errorMessage) {
      return (
        <PageAlert as="error">
          <h4>There was a problem loading the page</h4>
        </PageAlert>
      )
    }

    switch (this.props.step) {
      case 1:
        return (
          <ServiceEditList editServiceData={this.props.editServiceData} linkClick={this.loadStepTwo} {...this.props} />
        )
      case 2:
        return <PricingList pricesData={this.props.pricesData} {...this.props} />
      case 3:
        return <EditPriceForm priceData={this.props.priceData} {...this.props} />

      default:
        return ''
    }
  }

  render() {
    return (
      <Layout>
        {this.mainSection()}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentlySending: state.app.currentlySending,
    errorMessage: state.app.errorMessage,
    editServiceData: state.editPricing.editServiceData,
    pricesData: state.editPricing.pricesData,
    step: state.editPricing.step,
    priceData: state.editPricing.priceData,
    serviceToEdit: state.editPricing.serviceToEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadServiceEdit: () => dispatch(loadServiceEditData()),
    loadPrices: (serviceTypeId, categoryId, serviceName, subCategoryName) =>
      dispatch(loadPricesData(serviceTypeId, categoryId, serviceName, subCategoryName)),
    goToStepOne: step => dispatch(setStep(step)),
    editPrice: priceToEditData => dispatch(setPrice(priceToEditData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingDetailsForm)
