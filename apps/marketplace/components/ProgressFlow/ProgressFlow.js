/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Router, Link, withRouter, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import ProgressNav from 'marketplace/components/ProgressFlow/ProgressNav'
import ProgressContent from 'marketplace/components/ProgressFlow/ProgressContent'
import ProgressButtons from 'marketplace/components/ProgressFlow/ProgressButtons'

export class ProgressFlow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // this is the current state of the nav items in the progress indicator
      stages: {},
      // this is the state of whether the nav items are done
      stagesDone: {},
      // this is the current stage
      currentStage: '',
      // whether to redirect to the returnPath prop
      activateReturn: false
    }

    // populate the stage states
    this.props.stages.map(stage => {
      this.state.stages[stage.slug] = 'todo'
      this.state.stagesDone[stage.slug] = false
      return true
    })

    // determine the initial "doing" stage from the route
    if (
      Object.keys(this.props.match.params).includes('stage') &&
      Object.keys(this.state.stages).includes(this.props.match.params.stage)
    ) {
      this.state.stages[this.props.match.params.stage] = 'doing'
    }

    this.history = createHistory({
      basename: this.props.basename
    })

    this.setCurrentStage = this.setCurrentStage.bind(this)
    this.setStageStatus = this.setStageStatus.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handlePublish = this.handlePublish.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
  }

  componentDidMount() {
    this.updateAllStagesDoneStatus()
  }

  componentDidUpdate(prevProps) {
    // if the form model has changed, redetermine each stage's done status
    if (JSON.stringify(prevProps[this.props.model]) !== JSON.stringify(this.props[this.props.model])) {
      this.updateAllStagesDoneStatus()
    }
  }

  setStageStatus(stage, status) {
    this.setState(curState => {
      const newState = { ...curState }
      if (status === 'doing') {
        // there can only be one "doing" stage, so revert any existing "doing" stage
        Object.keys(newState.stages).map(stateStage => {
          if (newState.stages[stateStage] === 'doing') {
            newState.stages[stateStage] = curState.stagesDone[stateStage] ? 'done' : 'todo'
          }
          return true
        })
      }
      newState.stages[stage] = status
      return newState
    })
  }

  getNextStage(curStage) {
    let nextStage = ''
    const stages = Object.keys(this.state.stages)
    const curIndex = stages.indexOf(curStage)
    if (curIndex !== -1 && typeof stages[curIndex + 1] !== 'undefined') {
      nextStage = stages[curIndex + 1]
    }
    return nextStage
  }

  setCurrentStage(stage) {
    this.setState({
      currentStage: stage
    })
    this.setStageStatus(stage, 'doing')
  }

  updateAllStagesDoneStatus() {
    const stagesDone = { ...this.state.stagesDone }
    const stages = { ...this.state.stages }
    this.props.stages.map(stage => {
      if (typeof stage.isDone === 'function') {
        stagesDone[stage.slug] = stage.isDone(this.props[this.props.model])
        if (stagesDone[stage.slug] && stages[stage.slug] !== 'doing') {
          stages[stage.slug] = 'done'
        }
      }
      return true
    })
    this.setState(curState => {
      const newState = { ...curState }
      newState.stagesDone = { ...curState.stagesDone, ...stagesDone }
      newState.stages = { ...curState.stages, ...stages }
      return newState
    })
  }

  handleFormSubmit() {
    this.props.saveModel()
    const nextStage = this.getNextStage(this.state.currentStage)
    if (nextStage) {
      this.props.history.push(`${this.props.basename}/${nextStage}`)
      this.setCurrentStage(nextStage)
    }
  }

  handlePublish() {
    this.props.saveModel(true)
  }

  handleReturn() {
    this.setState({
      activateReturn: true
    })
  }

  allStagesDone() {
    // remove the final review stage if it exists
    const stages = { ...this.state.stagesDone }
    if (stages.review !== undefined) {
      delete stages.review
    }
    return !Object.values(stages).some(val => val === false)
  }

  isLastStage(stage) {
    const stages = Object.keys(this.state.stages)
    return stage === stages[stages.length - 1]
  }

  isFirstStage(stage) {
    const stages = Object.keys(this.state.stages)
    return stage === stages[0]
  }

  render() {
    if (this.state.activateReturn) {
      return <Redirect to={this.props.returnPath} />
    }

    const items = []
    this.props.stages.map(stage =>
      items.push({
        link: `${this.props.basename}/${stage.slug}`,
        linkComponent: Link,
        text: stage.title,
        slug: stage.slug,
        status: this.state.stages[stage.slug]
      })
    )

    return (
      <Router history={this.props.history}>
        <Form model={this.props.model} onSubmit={this.handleFormSubmit}>
          <div className="row">
            <div className="col-sm-4" aria-live="polite" aria-relevant="additions removals">
              <ProgressNav
                items={items}
                onNavChange={item => {
                  this.setCurrentStage(item.slug)
                }}
              />
            </div>
            <div className="col-sm-8">
              {this.props.stages.map(stage => (
                <Route
                  key={stage.slug}
                  path={`${this.props.basename}/${stage.slug}`}
                  render={() => (
                    <div>
                      <ProgressContent
                        stage={stage.slug}
                        model={this.props.model}
                        setCurrentStage={this.setCurrentStage}
                        saveModel={this.props.saveModel}
                        component={stage.component}
                      />
                      <ProgressButtons
                        isLastStage={this.isLastStage(stage.slug)}
                        isFirstStage={this.isFirstStage(stage.slug)}
                        publishEnabled={this.allStagesDone()}
                        onPublish={this.handlePublish}
                        onReturn={this.handleReturn}
                      />
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        </Form>
      </Router>
    )
  }
}

ProgressFlow.defaultProps = {
  basename: '',
  saveModel: () => {}
}

ProgressFlow.propTypes = {
  basename: PropTypes.string,
  stages: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
  returnPath: PropTypes.string.isRequired,
  saveModel: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default withRouter(connect(mapStateToProps)(ProgressFlow))
