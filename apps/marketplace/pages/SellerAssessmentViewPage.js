import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadDomainData, loadEvidenceData, saveEvidence} from 'marketplace/actions/supplierActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import formProps from 'shared/form/formPropsSelector'
import SellerAssessmentView from 'marketplace/components/SellerAssessment/SellerAssessmentView'

class SellerAssessmentViewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.evidenceId) {
      this.getEvidenceData().then(data => this.getDomainData(data.domainId))
    }
  }

  getDomainData(domainId) {
    if (domainId) {
      this.setState({
        loading: true
      })
      this.props.loadDomainData(domainId).then(() => this.setState({ loading: false }))
    }
  }

  getEvidenceData() {
    this.setState({
      loading: true
    })
    return this.props.loadInitialData(this.props.match.params.evidenceId).then(response => {

      this.setState({
        loading: false
      })

    })}

  render() {

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }


    return <SellerAssessmentView meta={{ domain: this.props.domain, evidence: this.props.evidence }} />
  }
}

const mapStateToProps = state => ({
  ...formProps(state),
  domain: state.domain.domain,
  evidence: state.evidence
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: evidenceId => dispatch(loadEvidenceData(evidenceId)),
  loadDomainData: domainId => dispatch(loadDomainData(domainId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentViewPage)