import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from '../shared/NotFound'

export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
