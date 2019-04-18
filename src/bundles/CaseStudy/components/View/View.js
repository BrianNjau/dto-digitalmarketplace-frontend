import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import { assessmentSave, assignToAssessorSave, deleteCaseStudyAssessment } from '../../redux/modules/casestudy'
import { updateCaseStudyStatus } from '../../redux/modules/casestudies'

import isEmpty from 'lodash/isEmpty';

import { newline } from '../../../../helpers';

import view from './View.css'

class View extends React.Component {
  state = { 
    showConfirm: false,
    assessmentForm: {
      status: 'unassessed',
      comment: null,
      approved_criteria: {}
    },
    assignToAssessorForm: {
      assessor_user_id: null
    },
    assessmentSaved: false,
    role: null
  }

  toggleConfirm(show = true) {
    this.setState({
      showConfirm: show
    }, () => this.state.showConfirm && this.refs.confirm.focus());
  }

  render() {
    const {
      title,
      opportunity,
      client,
      supplier_name,
      supplier_url = null,
      approach,
      timeframe,
      outcome,
      project_links,
      service,
      roles,
      meta,
      confirmButton = null,
      returnLink = null,
      domain = {},
      onAssessmentSubmit,
      onAssignToAssessorSubmit,
      onApproveClick,
      onRejectClick,
      onResetUnassessedClick,
      onDeleteCaseStudyAssessment
    } = this.props;
    let {
      
    } = this.props;
    const {
      showConfirm,
      assessmentForm,
      assignToAssessorForm
    } = this.state;

    return (
      <section id="casestudy__view" styleName="view.case-study-summary">
        {showConfirm && (
          <div ref="confirm" className="callout--warn" aria-labelledby="callout--success__heading" tabIndex="-1" role="alert">
            <p id="callout--success__heading">Are you sure you want to delete this case study?</p>
            <a href={meta.deleteLink} className="button">Delete this case study</a>
            <button className="button-secondary" onClick={this.toggleConfirm.bind(this, false)}>No, keep this case study</button>
          </div>
        )}
        <div className="row">
          {meta && meta.role === 'manager' && (
            <div className="col-md-12">
              <LocalForm onSubmit={onAssignToAssessorSubmit} initialState={assignToAssessorForm}>
                <fieldset>
                  <legend><h1 className="au-display-xl">Case Study Management</h1></legend>
                  <h4 id="q-devices-owned">Assign an admin user to assess this case study</h4>
                  <p>
                    <Control.select model=".assessor_user_id" id="assessor_user_id">
                      <option value="" disabled selected>Select an Admin User</option>
                      {Object.keys(meta.adminUserNameIdList).map(function(key,index) { 
                        return <option value={key}>{meta.adminUserNameIdList[key]}</option>;})
                      }
                    </Control.select>
                  </p>
                  <button className="button-save">Save</button>
                </fieldset>
              </LocalForm>
              <LocalForm>
                <fieldset>
                <legend id="q-devices-owned"><h3>Case study assessments</h3></legend>
                  {
                    meta.casestudies.map((cs, i) =>
                      <div>
                        <span key={cs.id}>
                        <div className="row">
                          <div>
                            <div className="col-md-2"><b>Assessors</b></div>
                            <div className="col-md-2"><b>Result</b></div>
                            <div className="col-md-4"><b>Assessor comment</b></div>
                            <div className='col-md-2'><b>Delete unassessed</b></div>
                          </div>
                        </div>
                        <hr/>
                        {cs.assessment_results && cs.assessment_count > 0 ? cs.assessment_results.map(ar =>
                          <div key={ar.id} className="row">
                             <div className="col-md-2">{ar.username}</div>
                             <div className="col-md-2">{ar.status}</div>
                             <div className="col-md-4">{ar.comment}</div>
                             <div className='col-md-2'> 
                              {(() => {switch (ar.status) {
                                    case "rejected":   return <a href="#" className="button-delete" hidden="true" >Delete</a>;
                                    case "approved":   return <a href="#" className="button-delete" hidden="true">Delete</a>;
                                    case "unassessed":   return <a href="#" className="button-delete" onClick={e =>{
                                      e.preventDefault();
                                      onDeleteCaseStudyAssessment(ar.id);
                                    }} name="deleteCSA">Delete</a>;
                                  }})()} 
                             </div>
                          </div>
                          ) : <i>no assessments</i>}
                        <hr/>
                      </span>  
                      </div>
                    )
                  }
                </fieldset>
              </LocalForm>
              <LocalForm>
                <fieldset>
                  <div>
                    <legend id="q-devices-owned"><h3>Change case study status</h3></legend>
                      {
                        meta.casestudies.map((cs, i) =>
                          <div>
                            <span key={cs.id}>
                              <div className="row">
                                <div className="col-md-2">
                                  <a href="#" onClick={e => {
                                    e.preventDefault();
                                    onApproveClick(cs.id);
                                  }} name="approve">Approve</a>
                                </div>
                                <div className="col-md-2">
                                <a href="#" onClick={e => {
                                  e.preventDefault();
                                  onRejectClick(cs.id);
                                }} name="reject"> Reject </a>
                                </div>
                                <div className="col-md-2">
                                <a href="#" onClick={e => {
                                  e.preventDefault();
                                  onResetUnassessedClick(cs.id);
                                }} name="unassessed"> Unassessed </a>
                              </div>
                              </div>
                              <br/>
                              <p>Case study's current status: <b>{cs.status.toUpperCase()}</b></p>
                              <hr/>
                            </span>
                          </div>
                        )
                      }
                    </div>
                  </fieldset>
              </LocalForm>
            </div>
          )}
        </div>
        <header className="row">
          <div className="col-xs-12">
            <h1 className="au-display-xl" tabIndex="-1">{title}</h1>
          </div>
          <div className="meta col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <p>by {supplier_url ? <a href={supplier_url}>{supplier_name}</a> : supplier_name}</p>
              </div>
              {meta && meta.editLink && (
                <div className="col-xs-12 col-sm-5 actions">
                  <a href={meta.editLink}>Edit case study</a>
                  <button className="button-secondary" onClick={this.toggleConfirm.bind(this)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="row">
          <div styleName="view.case-study-content">
            <div styleName="view.case-study-sidebar">
              <aside className="col-sm-3 col-xs-12">
                <h3 className="au-display-md">Client</h3>
                <p>{client}</p>

                <h3 className="au-display-md">Timeframe</h3>
                <p>{timeframe}</p>

                <h3 className="au-display-md">Area of expertise</h3>
                <p>{service}</p>

                <h3 className="au-display-md">Responsible for</h3>
                <p>{roles}</p>
              </aside>
            </div>
            <article role="main" className="col-sm-7 col-xs-12">
              <section>
                <h2 className="au-display-md">Challenge</h2>
                <p className="freetext">{newline(opportunity)}</p>
              </section>
              <section>
                <h2 className="au-display-md">Approach</h2>
                <p className="freetext">{newline(approach)}</p>
              </section>
              <section>
                <h2 className="au-display-md">Outcomes and benefits</h2>
                <ul>
                  {outcome && outcome.map((content, i) => <li key={i}>{content}</li>)}
                </ul>
              </section>
              {project_links && project_links.length > 0 && (
                <section styleName="view.project">
                  <h2 className="au-display-md">Project links</h2>
                  <ul>
                    {project_links.map((item, i) => <li key={i}>
                      {typeof item == 'object' ?
                        <a className="project__links" href={item.url} rel="external" target="_blank">{isEmpty(item.title) ? item.url : item.title}</a>
                        :
                        <a className="project__links" href={item} rel="external" target="_blank">{item}</a>
                      }
                    </li>)}
                  </ul>
                </section>
              )}
              <div className="casestudy__actions">
                {confirmButton}
                {returnLink}
              </div>
            </article>
          </div>
        </div>
        <hr/>
        <div className="row">
          {meta && meta.role === 'assessor' && (
            <div className="col-md-12">
              <LocalForm onSubmit={onAssessmentSubmit} initialState={assessmentForm}>
                <fieldset>
                  <legend id="q-devices-owned"><h4>Select criterias to approve</h4></legend>
                  {domain.domain_criterias.map(dc =>
                    <span key={dc.id}>
                      <Control.checkbox model={'.approved_criteria.' + dc.id} id={dc.id} value={dc.id} />
                      <label htmlFor={dc.id}>{dc.name}</label>
                    </span>
                  )}
                  <p>
                    <label htmlFor="comment">Comment</label>
                    <Control.textarea model=".comment" id="comment" />
                  </p>
                  <p>
                    <label htmlFor="status">Status</label>
                    <Control.select model=".status" id="status">
                      <option value="unassessed">Unassessed</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </Control.select>
                  </p>
                </fieldset>
                <button className="button-save">Save</button>
              </LocalForm>
            </div>
          )}
        </div>
      </section>
    )
  }
}

View.propTypes = {
  title: PropTypes.string.isRequired,
  opportunity: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  approach: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  outcome: PropTypes.arrayOf(PropTypes.string).isRequired,
  project_links: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.objectOf(PropTypes.string),

  returnLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

const mapStateToProps = (state, casestudies, ownProps) => {
  return {
    ...state.casestudy,
    ...ownProps,
    meta: state.meta,
    casestudies,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onResetUnassessedClick: () => {},
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onApproveClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'approved'))
    },
    onRejectClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'rejected'))

    },
    onResetUnassessedClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'unassessed'))
    },
    onAssessmentSubmit: (values) => {
      dispatch(assessmentSave(values))
    },
    onAssignToAssessorSubmit: (values) => {
      dispatch(assignToAssessorSave(values))
    },
    onDeleteCaseStudyAssessment: (values) => {
      dispatch(deleteCaseStudyAssessment(values))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(View)
