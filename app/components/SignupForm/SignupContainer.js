import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupForm from './SignupForm'
import UserOnboardingContainer from '../Onboarding/OnboardingContainer'
import CreateUserPage from '../../pages/CreateUserPage' // eslint-disable-line import/no-named-as-default
import NotFound from '../shared/NotFound'

const Routes = props => {
  const { match } = props
  return (
    <Switch>
      <Route exact path={match.url} component={SignupForm} />
      <Route path={`${match.url}/createuser/:token`} component={CreateUserPage} />
      <Route path={`${match.url}/success`} component={UserOnboardingContainer} />
      <Route component={NotFound} />
    </Switch>
  )
}

Routes.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(Routes)
