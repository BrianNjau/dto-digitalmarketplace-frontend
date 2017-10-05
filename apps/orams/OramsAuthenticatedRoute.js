import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import LoadingIndicator from 'shared/LoadingIndicator/LoadingIndicator'
import { rootPath } from 'orams/routes'

const PrivateRouteComponent = props => {
  const { component: Component, loggedIn, customRedirectPath, currentlySending, ...rest } = props
  return (
    <Route
      {...rest}
      render={values => {
        if (loggedIn) {
          return <Component {...values} />
        }

        return currentlySending
          ? <LoadingIndicator />
          : <Redirect
              to={{
                pathname: customRedirectPath || `${rootPath}/login`,
                state: { from: values.location }
              }}
            />
      }}
    />
  )
}

PrivateRouteComponent.defaultProps = {
  customRedirectPath: null,
  currentlySending: false
}

PrivateRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  customRedirectPath: PropTypes.string,
  currentlySending: PropTypes.bool
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending
})

const PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRouteComponent))

export default PrivateRoute